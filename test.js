function(instance, context) {
    console.log("Weeeb3", solanaWeb3);

    let provider;

    const getProvider = (providerId) => {
        if (providerId == 1) {
            provider = window.phantom.solana;
            if (provider && provider.isPhantom) {
                return provider;
            }
        } else if (providerId == 2) {
            provider = window.solflare;
            if (provider && provider.isSolflare) {
                return provider;
            }
        } else if (providerId == 3) {
            provider = window.backpack;
            if (provider && provider.isBackpack) {
                return provider;
            }
        }
        // Handle case where provider is not found
        return null;
    };

    const connectWallet = async (providerId) => {
        if (!provider || provider.providerId !== providerId) {
            provider = getProvider(providerId);
        }
        if (provider) {
            const resp = await provider.connect();
            console.log("Response", resp);
            console.log('publicKey', provider.publicKey.toString());
            instance.publishState('is_connected', true);
            // Publish the public key if needed
            instance.publishState('public_key_adr', provider.publicKey.toString());
        } else {
            console.error('Provider not found');
        }
    }

    const disconnectWallet = async (providerId) => {
        if (!provider || provider.providerId !== providerId) {
            provider = getProvider(providerId);
        }
        if (provider) {
            const resp = await provider.disconnect();
            console.log("Response", resp);
            instance.publishState('public_key_adr', "");
            instance.publishState('is_connected', false);
        } else {
            console.error('Provider not found');
        }
    }

    const signMessage = async (message, providerId) => {
        if (!provider || provider.providerId !== providerId) {
            provider = getProvider(providerId);
        }
        console.log("Provider App", provider);
        if (provider) {
            const encodedMessage = new TextEncoder().encode(message);
            const signedMessage = await provider.signMessage(encodedMessage, "utf8");
            instance.publishState('signed_message', false);
        }
    }

    const transferToken = async (mint, amount, receiver, providerId) => {
        try {
            if (!provider || provider.providerId !== providerId) {
                provider = getProvider(providerId);
            }
            if (provider && provider.publicKey) {
                const senderAdr = provider.publicKey.toString();
                const myHeaders = new Headers();
                myHeaders.append("x-api-key", "f0-srNoFP0bZvGLE");
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "network": "mainnet-beta",
                    "from_address": senderAdr,
                    "to_address": receiver,
                    "token_address": mint,
                    "amount": amount,
                });

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                const response = await fetch("https://api.shyft.to/sol/v1/token/transfer_detach", requestOptions);
                const result = await response.json();
                if (result.success) {
                    const strTx = result["result"].encoded_transaction;
                    const txBuf = buffer.Buffer.from(strTx, "base64");
                    console.log(solanaWeb3.Transaction);
                    const tx = solanaWeb3.Transaction.from(txBuf);
                    const { signature } = await provider.signAndSendTransaction(tx);
                    console.log("Signature", signature);
                }
                console.log(result);
            }

        } catch (error) {
            console.log('error', error);
        }
    }
    const handleSwap = async (inputMint, outputMint, decimals, amount, slippage, providerId, fee) => {
        if (!provider || provider.providerId !== providerId) {
            provider = getProvider(providerId);
        }
        try {
            if (provider && provider.publicKey) {
                const quoteResponse = await (
                    await fetch('https://quote-api.jup.ag/v6/quote?inputMint=' + inputMint.trim() + '&outputMint=' + outputMint.trim() + '&amount=' + (amount * 10 ** decimals).toString() + '&slippageBps=' + slippage + '&platformFeeBps=' + fee)
                ).json();
    
                const { swapTransaction } = await (
                    await fetch('https://quote-api.jup.ag/v6/swap', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            // quoteResponse from /quote api
                            quoteResponse,
                            // user public key to be used for the swap
                            userPublicKey: provider.publicKey.toString(),
                            // auto wrap and unwrap SOL. default is true
                            wrapAndUnwrapSol: true,
                            // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
                            // feeAccount: "fee_account_public_key"
                        })
                    })
                ).json();
                const swapTransactionBuf = buffer.Buffer.from(swapTransaction, "base64");
                const transaction = solanaWeb3.VersionedTransaction.deserialize(swapTransactionBuf);
                const { signature } = await provider.signAndSendTransaction(tx);
                console.log("Signature", signature);
            }
    
        } catch (err) {
            console.log("swap error", err);
        }
    }
    
    instance.data.connect = connectWallet;
    instance.data.disconnect = disconnectWallet;
    instance.data.signMessage = signMessage;
    instance.data.transferToken = transferToken;
    instance.data.swapToken = handleSwap;
    console.log("Instance Data", instance.data);
}
