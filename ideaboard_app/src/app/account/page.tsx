import {UserPage} from "@/src/components/user/UserPage";
import {ThemeProvider} from "@/src/theme/ThemeProvider";
import {theme} from "antd";

export default function AccountPage() {

    return (
        <>
            <ThemeProvider>
                <UserPage/>
            </ThemeProvider>
        </>
    );
}