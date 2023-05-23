import { MarketContext } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

const Header = () => {
  const { setToNewPrices, setChanges, setCsvFile } = useContext(MarketContext)
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <header className="bg-green-700 text-purple-50 hover:text-purple-200 z-10 fixed w-full">
      <nav>
          <ul className="text-center w-full">
            { currentPath === '/File' ?  
          <Link href="/">
            <li>
                <button>Listas</button>
            </li> 
          </Link> 
          :
          <Link href="/File">
            <li>
              <button onClick={() => {
                setToNewPrices([]);
                setCsvFile(null);
                setChanges([]);
              }}>Enviar arquivo csv</button>
            </li>
          </Link>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;