import type { EnumWithIconsMap } from "../../utils";
import { BUSDIcon } from "./BUSDIcon.tsx";
import { DAIIcon } from "./DAIIcon.tsx";
import { FRAXIcon } from "./FRAXIcon.tsx";
import { USDCIcon } from "./USDCIcon.tsx";
import { USDTIcon } from "./USDTIcon.tsx";
import { USDDIcon } from "./USDDIcon.tsx";
import { USDSIcon } from "./USDSIcon.tsx";
import { USDEIcon } from "./USDEIcon.tsx";
import { USDT0Icon } from "./USD₮0Icon.tsx";
import { USDLIcon } from "./USDLIcon.tsx";
import { eUSDIcon } from "./eUSDIcon.tsx";
import { ArbitrumIcon } from "./ArbitrumIcon.tsx";
import { AvalancheIcon } from "./AvalancheIcon.tsx";
import { BaseIcon } from "./BaseIcon.tsx";
import { CardanoIcon } from "./CardanoIcon.tsx";
import { EthereumIcon } from "./EthereumIcon.tsx";
import { EtherlinkIcon } from "./EtherlinkIcon.tsx";
import { MantleIcon } from "./MantleIcon.tsx";
import { OptimismIcon } from "./OptimismIcon.tsx";
import { PolygonIcon } from "./PolygonIcon.tsx";
import { SolanaIcon } from "./SolanaIcon.tsx";
import { TronIcon } from "./TronIcon.tsx";

export const stablecoinIconsMap: EnumWithIconsMap = {
  BUSD: BUSDIcon,
  DAI: DAIIcon,
  FRAX: FRAXIcon,
  USDC: USDCIcon,
  USDT: USDTIcon,
  USDD: USDDIcon,
  USDS: USDSIcon,
  USDE: USDEIcon,
  "USD₮0": USDT0Icon,
  USDBC: USDCIcon,
  USDDOLD: USDDIcon,
  USDL: USDLIcon,
  EUSD: eUSDIcon,
};

export const chainsIconsMap: EnumWithIconsMap = {
  ARBITRUM: ArbitrumIcon,
  AVALANCHE: AvalancheIcon,
  BASE: BaseIcon,
  CARDANO: CardanoIcon,
  ETHEREUM: EthereumIcon,
  ETHERLINK: EtherlinkIcon,
  MANTLE: MantleIcon,
  OPTIMISM: OptimismIcon,
  POLYGON: PolygonIcon,
  SOLANA: SolanaIcon,
  TRON: TronIcon,
};
