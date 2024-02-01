import { useProduct, useTrader } from "@/context/dexterity";
import { useWebSocket } from "@/context/websocket";
import { BsChevronDown } from "react-icons/bs";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SelectedCoin } from "./SelectCoin";
import Container from "./container";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "@bonfida/hooks";
import {
  Group,
  GroupPubkeyMap,
  Product,
  ProductMap,
} from "../views/trade/perpetual-constants";

const PerceptualMarketHeader = () => {
  const { indexPrice, selectedProduct, markPrice } = useProduct();
  const { selectedMarket, selectMarket, candles } = useWebSocket();
  const { trader } = useTrader();
  const { setSelectedProductIndex, setMpgPubkey } = useProduct();
  const { width } = useWindowSize();
  const [selectedGroup, setSelectedGroup] = useState<Group>(
    GroupPubkeyMap.get(0)
  );

  const selectedIndexPrice = useMemo(() => {
    return indexPrice?.find((p) => p.index === selectedProduct?.index)?.price;
  }, [indexPrice, selectedProduct]);

  const handleSelectMarket = (product: Product) => {
    selectMarket({
      high: "N/A",
      low: "N/A",
      coin: [product.base, product.name, "SomeIdentifier"],
      coinLogo: product.baseLogo,
      name: product.name,
    });
    setSelectedProductIndex({
      index: product.index,
      name: product.name,
      minSize: product.minSize,
      exponent: product.exponent,
    });
  };

  const renderMarketOptions = () => {
    const groupProducts = ProductMap.get(selectedGroup?.productsIndex);
    if (!groupProducts) return null;

    return Array.from(groupProducts.values()).map(
      (product, idx) =>
        product.mapType == "num" && (
          <DropdownMenuItem
            key={idx}
            onClick={() => handleSelectMarket(product)}
          >
            {product.name}
          </DropdownMenuItem>
        )
    );
  };

  const renderMarketSelection = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex  px-4 py-2 rounded-lg bg-[#141414] lg:flex-row items-center justify-between gap-4 w-full border border-[rgba(168, 168, 168, 0.10)]">
            <span> {selectedMarket?.name || "Select Market"}</span>
            <Button size="icon" className="bg-[#BBB0DB] trade-bg">
              <BsChevronDown />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{renderMarketOptions()}</DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderPriceDisplay = () => (
    <div>
      {selectedIndexPrice ? (
        <>
          <p className="text-[#8BD796] text-3xl font-medium">
            ${selectedIndexPrice ? selectedIndexPrice.toFixed(2) : "N/A"}
          </p>
          <p className="text-muted-foreground text-[10px] text-right">
            INDEX PRICE: $ {selectedIndexPrice ?? 0}
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );

  const renderContentForLargeScreens = () => (
    <>
      <div className="flex flex-row items-center gap-3">
        {/* {renderGroupDropdown()} */}
        <img
          src={selectedMarket.coinLogo}
          alt="bitcoin"
          className="w-10 h-10 rounded-full"
        />
        {renderMarketSelection()}
      </div>
      {renderPriceDisplay()}
    </>
  );

  const renderContentForSmallScreens = () => (
    <div className="flex flex-col">
      {/* {renderGroupDropdown()} */}
      {renderMarketSelection()}
      <div className="flex flex-col items-start mt-3">
        {renderPriceDisplay()}
      </div>
    </div>
  );

  return (
    <Container className="w-full flex justify-between items-center bg-background py-6 px-9 border border-[rgba(168, 168, 168, 0.10)]">
      {width > 1000
        ? renderContentForLargeScreens()
        : renderContentForSmallScreens()}
    </Container>
  );
};

export default PerceptualMarketHeader;
