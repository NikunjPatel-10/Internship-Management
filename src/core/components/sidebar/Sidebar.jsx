import { useContext, useState } from "react";
import { Group, Image, Divider } from "@mantine/core";
import {
  IconHome2,
  IconUserStar,
  IconTimeline,
  IconUsers,
  IconLogout,
  IconSitemap,
  IconMenu2,
} from "@tabler/icons-react";
import Logo from "./../../../../src/assets/download.png";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import InternshipContext from "../../../shared/store/Context";

const data = [
  { link: "/", label: "Home", icon: IconHome2 },
  { link: "/intern-batch", label: "Intern Batch", icon: IconUsers },
  { link: "/mentors", label: "Mentor", icon: IconUserStar },
  { link: "/roadmap", label: "Roadmap", icon: IconSitemap },
  { link: "/tracker", label: "Training Tracker", icon: IconTimeline },
];

export default function Sidebar() {
  const { logout } = useAuth0();
  const [active, setActive] = useState("Home");
  const { setSearchTerm } = useContext(InternshipContext);
  const links = data.map((item, index) => (
    // For navigation routes added link
    <Link to={item.link} key={index}>
      <li
        className={classes.link}
        data-active={item.label === active || undefined}
        key={item.label}
        onClick={() => {
          setActive(item.label), setSearchTerm("");
        }}
      >
        <item.icon className={classes.linkIcon} size={20} stroke={1.3} />
        <span>{item.label}</span>
      </li>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group
          className={classes.header}
          justify="center"
          style={{ position: "relative" }}
        >
          <IconMenu2
            className="menu-collapse"
            color="white"
            size={32}
            style={{ position: "absolute", left: 0 }}
          ></IconMenu2>
          <Image h={25} w="auto" className="logo-img" src={Logo} />
        </Group>
        <ul style={{ paddingLeft: "0" }}>{links}</ul>
      </div>
      <div className={classes.footer}>
        <Divider my="md" />
        <a
          href="#"
          className={classes.link}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <IconLogout
            className={classes.linkIcon}
            stroke={1.5}

          />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
