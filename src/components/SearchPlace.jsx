import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PlacesAutocomplete from "react-places-autocomplete";
import { useNavigate, useParams } from "react-router-dom";

const SearchPlace = () => {
  const nav = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { place } = useParams();
  const [holdToast, setHoldToast] = useState(false);

  useEffect(() => {
    if (place) setSearchValue(place);
  }, [place]);

  const updateSearchValue = (value) => {
    if (/[\u0590-\u05FF]/.test(value)) {
      if (!holdToast) {
        toast.error("incorrect text");
        setHoldToast(true);
        setTimeout(() => {
          setHoldToast(false);
        }, 10 * 1000);
      }
    } else {
      setSearchValue(value);
    }
  };

  const handleSelect = (valueSelected) => {
    setSearchValue(valueSelected);
    nav(`/${valueSelected}`);
  };

  return (
    <PlacesAutocomplete
      value={searchValue}
      onChange={updateSearchValue}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="relative  text-black">
          <input
            className="focus:outline-none text-lg px-2 py-1 w-72 rounded-sm"
            placeholder="Search place"
            {...getInputProps()}
          />
          <div className="autocomplete-dropdown-container absolute">
            {suggestions.map((suggestion) => {
              return (
                <div
                  className="bg-white w-72 hover:bg-slate-200 cursor-pointer border-t-2 border-blue-600 p-1"
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion)}
                >
                  <span className="searchResult">{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default SearchPlace;
