import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import SIgnIn from "../pages/auth/SIgnIn";
import Register from "../pages/auth/Register";
import JobDetails from "../pages/jobs/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/jobs/JobApplicationForm";
import JobApplicationForm from "../pages/jobs/JobApplicationForm";
import AppliedJobs from "../pages/jobs/AppliedJobs";
import AddJobForm from "../pages/jobs/AddJobForm";
import MyPostedJobs from "../pages/jobs/MyPostedJobs";
import FindJob from "../pages/jobs/FindJob";
import ViewApplications from "../pages/jobs/ViewApplications";

const router = createBrowserRouter([
      {
        path:"/",
        element:<Root/>,
        children:[
            {
              path: "/",
              element:<Home/>
            },
            {
              path: "/findJob",
              element:<FindJob/>
            },
            {
              path: "/jobs/:id",
              element:<PrivateRoute><JobDetails/></PrivateRoute>,
              loader:({params})=>fetch(`https://job-portal-server-ten-kappa.vercel.app/jobs/${params.id}`)
            },
            {
              path: "/addJob",
              element:<PrivateRoute><AddJobForm/></PrivateRoute>,
              
            },
            {
              path: "/applied-jobs",
              element:<PrivateRoute><AppliedJobs/></PrivateRoute>,
            },
            {
              path: "/my-posted-job",
              element:<PrivateRoute><MyPostedJobs/></PrivateRoute>,
            },
            {
              path: "/job-apply/:id",
              element:<PrivateRoute><JobApplicationForm/></PrivateRoute>,
              
            },
            {
              path: "/view-applications/:job_id",
              element:<PrivateRoute><ViewApplications/></PrivateRoute>,
              loader:({params})=>fetch(`https://job-portal-server-ten-kappa.vercel.app/job-applications/jobs/${params.job_id}`)
              
            },
            {
              path: "/signIn",
              element:<SIgnIn/>
            },
            {
              path: "/register",
              element:<Register/>
            },
        ]
      }
])

export default router