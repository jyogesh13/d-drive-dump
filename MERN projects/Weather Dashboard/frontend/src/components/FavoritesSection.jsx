import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FavoritesSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (() => {
      setFavorites(currentUser?.user.favorites);
    })();
  }, [currentUser?.user.favorites]);

  if (currentUser?.user.favorites) {
    console.log(currentUser?.user.favorites.length);
  }

  return (
    <aside className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-[#213448] mb-4">
        Favorite Cities
      </h3>

      <div className="space-y-3">
        {favorites ? favorites?.map((item) => (
          <div
            key={item.city}
            className="flex justify-between items-center bg-[#EAE0CF] rounded-md px-3 py-2"
          >
            <span className="text-sm text-[#213448]">{item.city}</span>
            <span className="text-sm text-[#547792]">{item.temp}</span>
          </div>
        )): ""}
      </div>
    </aside>
  );
};

export default FavoritesSection;
