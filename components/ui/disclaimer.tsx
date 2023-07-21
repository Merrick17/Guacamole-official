'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';

const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  useEffect(() => {
    const isDisclaimerAccepted = localStorage.getItem('isDisclaimerAccepted');
    if (!isDisclaimerAccepted) {
      setIsOpen(true);
    }
  }, []);
  const save = () => {
    localStorage.setItem('isDisclaimerAccepted', 'true');
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h1 className="text-base">Before Continuing...</h1>
          </AlertDialogTitle>
          <AlertDialogDescription className="h-[50vh] max-h-[50vh] overflow-auto text-xs text-black/50 flex flex-col items-start gap-4">
            <p>
              This website-hosted user interface {'(this "Interface")'} is an
              open source frontend software portal that interacts with several
              blockchain-enabled smart contracts and tools created by reputable
              third-parties and the Guacamole community. This interface is made
              available by the AvocaDAO and maintained through community
              contributions. However, all transactions conducted are run by
              related permissionless smart contracts. As this interface is
              open-sourced and all smart contracts are accessible by any user,
              entity, or third-party, there may be a number of different
              applications or interfaces that interact or allow for interaction
              with the same third-party contracts or protocols specifically
              developed as the {'Guacamole Protocol'}.
            </p>
            <p>
              This interface and related integrations are provided {'AS IS'}, at
              your own risk, and without warranties of any kind. The AvocaDAO
              does not provide, own, or control any of the blockchain-enabled
              smart contract integrations or transactions conducted through
              protocols or related smart contracts. By using or accessing this
              interface or related protocols and smart contracts, you agree that
              no developer or entity involved in creating, deploying, or
              maintaining this interface or related protocols will be liable for
              any claims or damages whatsoever associated with your use,
              inability to use, or your interaction with other users of this
              interface or related protocols, including any direct, indirect,
              incidental, special, , exemplary, punitive, or consequential
              damages, or loss of profits, digital assets, tokens, NFTs, or
              anything else that may be considered of value. This deployment of
              Guacamole may not be available to residents of Belarus, The
              Central African Republic, The Democratic Republic of Congo, The
              Democratic {"People's"} Republic of Korea, The Crimea, Donetsk{' '}
              {"People's"} Republic, and Luhansk {"People's"} Republic regions
              of Ukraine, Cuba, Iran, Libya, Somalia, Sudan, South Sudan, Syria,
              regions of the USA, Yemen, Zimbabwe, and any other jurisdiction in
              which accessing or using integrated protocols is or may be
              prohibited.
            </p>
            <p>
              By using or accessing this Interface, you represent that you are
              not located in, incorporated, or established in, or a citizen or
              resident of the Prohibited Jurisdictions. You also represent that
              you are not subject to sanctions or otherwise designated on any
              list of prohibited or restricted parties or excluded or denied
              persons, including but not limited to the lists maintained by the
              United {"States'"} Department of {"Treasury's"} Office of Foreign
              Assets Control, the United Nations Security Council, the European
              Union, or its Member States, or any other government authority.
            </p>
            <p>
              By using this interface you also agree to being 18 or older. We
              encourage all users to be aware of the potential risks associated
              with decentralized gaming activities. It is important to set
              limits before engaging in any of these gaming activities,
              establishing clear boundaries on the amount of time and money you
              are willing to spend. All forms of gaming carry inherent risks
              based on chance. Never use borrowed funds and only participate
              with funds that you can afford to lose. Should you ever feel that
              your gaming habits are becoming problematic, seek help and support
              from friends, family, or professional resources.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={isAccepted}
              onCheckedChange={() => setIsAccepted((s) => !s)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-[#828282]  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read, understand, and accept these terms
            </label>
          </div>
          <AlertDialogAction
            className="w-full !ml-0"
            disabled={!isAccepted}
            onClick={save}
          >
            Accept And Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Disclaimer;
