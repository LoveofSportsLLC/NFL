/**
 * This code was generated by Builder.io.
 */
import * as React from "react";

function MyComponent(props) {
  return (
    <div className="fill-white overflow-hidden">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[62%] max-md:w-full max-md:ml-0">
          <div className="bg-neutral-50 flex grow flex-col items-stretch w-full px-8 py-9 max-md:mt-5 max-md:px-5">
            <div className="text-black text-xl font-bold leading-8 tracking-tight whitespace-nowrap">
              Use components
            </div>
            <div className="text-black text-opacity-80 text-xs leading-4 tracking-normal mt-4">
              Drag and drop components onto your canvas from the Assets panel.
              If you’re on an Education, Professional, or Organization team, you
              can publish them for team members to use across their own files.
            </div>
            <img
              loading="lazy"
              srcSet="..."
              className="aspect-[1.12] object-contain object-center w-full overflow-hidden mt-7"
            />
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[38%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col items-stretch my-auto max-md:mt-10">
            <div className="text-sky-600 text-center text-xs font-bold leading-4 tracking-normal">
              Drag the correct cursor component over these buttons to show
              default and hover states
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cfbe0c52f3013483de9f45faf5e6bc55d5a53ca8d84f1e46824d346845fd6faf?"
              className="aspect-[0.26] object-contain object-center w-2 stroke-[1px] stroke-sky-500 overflow-hidden self-center max-w-full mt-5"
            />
            <div className="self-center flex items-stretch justify-between gap-5 mt-4">
              <div className="text-white text-xs font-medium leading-4 whitespace-nowrap bg-cyan-300 aspect-[1.7894736842105263] justify-center items-stretch px-3.5 py-4 rounded-[1000px]">
                Default
              </div>
              <div className="text-white text-xs font-medium leading-4 whitespace-nowrap bg-blue-500 aspect-[1.605263157894737] justify-center items-stretch px-3.5 py-4 rounded-[1000px]">
                Hover
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
