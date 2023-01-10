import Link from "next/link";
import React from "react";

const pages = [
  {
    text: "Create public note",
    href: "/publicNotes/create",
  },
  {
    text: "View public notes",
    href: "/publicNotes/ ",
  },
];

const Header = () => {
  return (
    <header className="flex w-full border-b p-4 pb-2">
      <h1>
        <Link href="/" className="flex">
          Note&nbsp;Taking
        </Link>
      </h1>
      <ul className="flex gap-4 justify-end w-full">
        {pages.map(({ href, text }, index) => {
          return (
            <li key={index}>
              <Link href={href}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
