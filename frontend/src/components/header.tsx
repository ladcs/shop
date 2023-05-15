import { MarketContext } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <nav>
        <ul>
          <li className={router.pathname === "/File" ? "active" : ""}>
            <Link href="/File">
              <button>Enviar arquivo csv</button>
            </Link>
          </li>
          <li className={router.pathname === "/PackTable" ? "active" : ""}>
            <Link href="/PackTable">
              <button>Packs</button>
            </Link>
          </li>
          <li className={router.pathname === "/" ? "active" : ""}>
            <Link href="/">
              <button>Produtos</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;