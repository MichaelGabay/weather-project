import React from "react";
import { Card } from "flowbite-react";
import { CgRemove } from "react-icons/cg";
import { useNavigate } from "react-router-dom"
const FavoritCard = ({ temp, icon, place, condotionText, removeFavorite }) => {
    const nav = useNavigate()
    return (
        <Card onClick={() => nav(`/${place}`)} className=" group" href="#">
            <div className="flex">
                <div className="text-2xl font-bold tracking-tight text-gray-900  w-2/3">
                    <p className="">
                        <span className="">{temp}°</span>
                    </p>
                    <p>{place}</p>
                    <p className="text-sm">{condotionText}</p>
                </div>
                <div className="flex justify-end w-1/3 items-start">
                    <img src={icon} alt=""  />
                    <CgRemove
                        onClick={(e) => { removeFavorite(place); e.stopPropagation() }}
                        size={30}
                        className="z-20 relative -top-3 -right-3  opacity-0 group-hover:opacity-100"
                    />
                </div>
            </div>
        </Card>
    );
};

export default FavoritCard;
