import { Breadcrumbs } from "@mantine/core";
import { Link } from "react-router-dom";
export function Breadcrumb({ data }) {
  const rows = data.map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return <Breadcrumbs>{rows}</Breadcrumbs>;
}
