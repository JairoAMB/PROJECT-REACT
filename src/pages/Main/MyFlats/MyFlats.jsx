import { LocalStorageService } from "../../../services/localStorage/localStorage";
import { MyFlatsTable } from "./MyFlatsTable/MyFlatsTable";

export const MyFlats = () => {

    const localStorageService = new LocalStorageService();
    const userLoggedId = localStorageService.getLoggedUser();

    console.log(userLoggedId);

    return(
        <>
            <div className="bg-bg_color_primary relative w-full h-full max-w-[1440px] m-auto flex flex-col  items-center">
                myflats
                <div className="w-11/12">
                    <MyFlatsTable userLoggedId={userLoggedId.id}/>
                </div>
            </div>
        </>
    );
}