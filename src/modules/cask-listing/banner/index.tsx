import React from "react";

export default function Banner() {
    return (
        <div className="w-full bg-dark-100 py-20">
            <div className="container grid grid-cols-12">
                <div className="col-start-2 -col-end-2">
                    <h1 className="text-4xl font-medium tracking-tighter text-typo-primary">
                        Cask Listing
                    </h1>
                    <div className="text-base text-typo-body">
                        Top products from distilleries around the world
                    </div>
                </div>
            </div>
        </div>
    );
}
