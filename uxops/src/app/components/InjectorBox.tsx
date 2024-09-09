import { Input } from "rizzui";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";

type CustomGroupProps = {
  title: string;
  promptText: string;
  friendlyname: string;
  seperator: string;
  step: number;
  last: boolean;
  handleOrderChildren: (i: number, action: number) => void;
};
export default function CustomInjectorGroupBox({
  children,
  title,
  promptText,
  friendlyname,
  seperator,
  step,
  last,
  handleOrderChildren,
}: React.PropsWithChildren<CustomGroupProps>) {
  return (
    <>
      <div className="flex gap-5 items-center">
        <div className="w-30 flex flex-col gap-3 items-center">
          {last ? (
            <>
              <BsArrowUpCircleFill
                className="text-3xl cursor-pointer"
                onClick={() => handleOrderChildren(step - 1, 1)}
              />
              Step{step}
            </>
          ) : step == 1 ? (
            <>
              Step{step}
              <BsArrowDownCircleFill
                className="text-3xl cursor-pointer"
                onClick={() => handleOrderChildren(step - 1, -1)}
              />
            </>
          ) : (
            <>
              <BsArrowUpCircleFill
                className="text-3xl cursor-pointer"
                onClick={() => handleOrderChildren(step - 1, 1)}
              />
              Step{step}
              <BsArrowDownCircleFill
                className="text-3xl cursor-pointer"
                onClick={() => handleOrderChildren(step - 1, -1)}
              />
            </>
          )}
        </div>
        <div className="w-full border-solid p-2 relative rounded border border-black mt-1">
          <label
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "white",
              padding: "2px 5px 2px 5px",
              borderRadius: 5,
            }}
          >
            {title}
          </label>
          <div
            style={{
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Input
              placeholder="Prompt Text"
              value={promptText}
              onChange={() => null}
            />
            <Input
              className="w-80"
              placeholder="Friendlyname"
              value={friendlyname}
              onChange={() => null}
            />
            <div className="flex flex-row justify-between">
              <Input
                className="w-40"
                placeholder="Seperator"
                value={seperator}
                onChange={() => null}
              />
              {/* <Button className="w-40">Seperator</Button> */}
              <div className="flex gap-5 items-end">
                <button className="w-10 h-7 outline outline-1 rounded-md outline-[#26AD60] text-[#26AD60]">
                  Tags
                </button>
                <button className="w-16 h-7 outline outline-1 rounded-md outline-[#26AD60] text-[#26AD60]">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
