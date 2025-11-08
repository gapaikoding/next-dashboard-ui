"use client";

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";


interface MenuChild {
  icon: string;
  label: string;
  href: string;
  visible: typeof role [];
}

interface MenuItem {
  icon: string;
  label: string;
  href?: string;
  visible: typeof role [];
  children?: MenuChild[];
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuItems: MenuGroup[] = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Academic",
        visible: ["admin", "teacher"],
        children: [
          {
            icon: "/subject.png",
            label: "Brands",
            href: "/list/brands",
            visible: ["admin", "teacher"],
          },
          {
            icon: "/subject.png",
            label: "Subjects",
            href: "/list/subjects",
            visible: ["admin", "teacher"],
          },
          {
            icon: "/lesson.png",
            label: "Grades",
            href: "/list/grades",
            visible: ["admin", "teacher"],
          },
          {
            icon: "/subject.png",
            label: "Steps",
            href: "/list/steps",
            visible: ["admin", "teacher"],
          },
          {
            icon: "/class.png",
            label: "Lessons",
            href: "/list/lessons",
            visible: ["admin", "teacher"],
          },
          {
            icon: "/lesson.png",
            label: "Packages",
            href: "/list/packages",
            visible: ["admin", "teacher"],
          },
        ],
      },
      {
        icon: "/subject.png",
        label: "Courses",
        visible: ["admin", "teacher"],
        children: [
          {
            icon: "/class.png",
            label: "Classes",
            href: "/list/classes",
            visible: ["admin", "teacher"],
          },
          {
            icon: "/lesson.png",
            label: "Sessions",
            href: "/list/sessions",
            visible: ["admin", "teacher"],
          },
          {
            icon: "/lesson.png",
            label: "Schedule",
            href: "/schedule",
            visible: ["admin", "teacher"],
          },
        ],
      },
      // {
      //   icon: "/exam.png",
      //   label: "Exams",
      //   href: "/list/exams",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/assignment.png",
      //   label: "Assignments",
      //   href: "/list/assignments",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      // {
      //   icon: "/attendance.png",
      //   label: "Attendance",
      //   href: "/list/attendance",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      // {
      //   icon: "/message.png",
      //   label: "Messages",
      //   href: "/list/messages",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleSubMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((group) => (
        <div className="flex flex-col gap-1" key={group.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {group.title}
          </span>

          {group.items.map((item) => {
            if (!item.visible.includes(role)) return null;

            // Jika punya anak (submenu)
            if (item.children && item.children.length > 0) {
              const isOpen = openMenu === item.label;

              return (
                <div key={item.label}>
                  <div
                    onClick={() => toggleSubMenu(item.label)}
                    className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-1 rounded-md cursor-pointer hover:bg-lamaSkyLight ${
                      isOpen ? "bg-lamaSkyLight" : ""
                    }`}
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{item.label}</span>
                    <span className="hidden lg:block ml-auto mr-2 text-[10px] text-gray-400">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="ml-8 flex flex-col gap-1">
                      {item.children.map(
                        (child) =>
                          child.visible.includes(role) && (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center justify-center lg:justify-start gap-3 text-gray-600 py-2 md:px-1 rounded-md hover:bg-gray-100"
                            >
                              <Image
                                src={child.icon}
                                alt=""
                                width={16}
                                height={16}
                              />
                              <span className="hidden lg:block">
                                {child.label}
                              </span>
                            </Link>
                          )
                      )}
                    </div>
                  )}
                </div>
              );
            }

            // Jika item biasa (tanpa children)
            return (
              <Link
                href={item.href!}
                key={item.label}
                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-1 rounded-md hover:bg-lamaSkyLight"
              >
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
