import { Navigate } from "react-router-dom";
import Curriculum from "../pages/Admin/Curriculum";
import Customer from "../pages/Admin/Customer";
import Data from "../pages/Admin/Data";
import Lesson from "../pages/Admin/Lesson";
import SubCurriculum from "../pages/Admin/SubCurriculum";

const Routes = [
    {
        path: "/customers",
        component: <Customer />,
    },
    {
        path: "/curriculums",
        component: <Curriculum />,
    },
    {
        path: "/curriculum/:parent_id",
        component: <SubCurriculum />,
    },
    {
        path: "/level/:level_id",
        component: <Lesson />,
    },
    {
        path: "datas",
        component: <Data />,
    },
    {
        path: "*",
        component: <Navigate to="/customers" />,
    },
];

export default Routes;
