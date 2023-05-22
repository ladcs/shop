import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <header>
      <nav>
        <ul>
          { currentPath === '/File' ?  <li className={router.pathname === "/" ? "active" : ""}>
            <Link href="/">
              <button>Listas</button>
            </Link>
          </li> :
          <li className={router.pathname === "/File" ? "active" : ""}>
            <Link href="/File">
              <button>Enviar arquivo csv</button>
            </Link>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;