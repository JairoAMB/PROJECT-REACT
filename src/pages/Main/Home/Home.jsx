import { FlatTable } from "../../../components/FlatTable/FlatTable";

export const Home = ()=> {

    return(
        <>
            <div className="bg-bg_color_primary relative w-full h-full max-w-[1440px] m-auto flex flex-col  items-center">
                <h1>Home</h1>
                <FlatTable/>
            </div>
        </>
    );
}