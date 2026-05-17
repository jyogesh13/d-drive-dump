import { menuItems } from "@/lib/data";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((item) => {
        return (
          <div key={item.title} className="flex flex-col gap-2">
            <span className="hidden lg:block text-gray-400 font-light my-2">
              {item.title}
            </span>
            {item.items.map((i) => {
              if (i.visible.includes(role)) {
                return (
                  <Link
                    href={i.href}
                    key={i.label}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-1 hover:bg-LightSky rounded-md md:px-2"
                  >
                    <Image src={i.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{i.label}</span>
                  </Link>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
