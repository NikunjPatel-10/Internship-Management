import { Routes, Route, Navigate } from "react-router-dom";
import Roadmap from "./pages/Roadmap/Roadmap";
import FormModal from "./pages/Roadmap/components/AddRoadmapForm";
import MentorDetails from "./pages/Mentors/MentorDetails";
import AddMentorDetails from "./pages/Mentors/components/AddMentorDetails";
import BatchForm from "./pages/Intern-batch/components/AddInternsBatchModal";
import AddRoadmapDetailsForm from "./pages/Roadmap/Roadmap-Details/components/AddRoadmapDetailsForm";
import RoadmapDetails from "./pages/Roadmap/Roadmap-Details/components/RoadmapDetailsTable";
import { useAuth0 } from "@auth0/auth0-react";
import TrainingTracker from "./pages/Training-Tracker/tracker";

import { InternsBatch } from "./pages/Intern-batch/InternsBatch";
import { InternshipBatchDetails } from "./pages/InternshipBatchDetails/InternshipBatchDetails";
import { BatchInternProfile } from "./pages/InternshipBatchDetails/components/BatchInterns/components/BatchInternProfile";
import TopicsDetailsList from "./pages/Training-Tracker/components/topicsDetailsList";
import { useEffect } from "react";
export default function Routing() {

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Navigate to="/intern-batch" />} />
          <Route path="/intern-batch" element={<InternsBatch />} />
          <Route path="/intern-batch/batch/add/new" element={<BatchForm />} />
          <Route
            path="/intern-batch/edit-batch/:batchId"
            element={<BatchForm />}
          />
          <Route
            path="/intern-batch/details/:batchId"
            element={<InternshipBatchDetails />}
          />
          <Route
            path="/intern-batch/details/:batchId/edit/:id"
            element={<InternshipBatchDetails />}
          />
          <Route
            path="/intern-batch/details/:batchId/profile/:id"
            element={<BatchInternProfile />}
          />
          <Route
            path="/intern-batch/details/:batchId/edit/:id"
            element={<InternshipBatchDetails />}
          />
          <Route
            path="/roadmap-details/:roadmapId"
            element={<RoadmapDetails />}
          />
          <Route path="/tracker/:roadmapId" element={<TopicsDetailsList />} />
          <Route path="/mentors" element={<MentorDetails />} />
          <Route path="/tracker" element={<TrainingTracker />} />
          <Route path="/tracker/edit/:topicId" element={<TrainingTracker />} />
          <Route path="/mentor/add/new" element={<AddMentorDetails />} />
          <Route path="/edit-mentor/:id" element={<AddMentorDetails />} />
          <Route path="/roadmap" element={<Roadmap />}></Route>
          <Route path="/roadmap/add/new" element={<FormModal />}></Route>
          <Route
            path="/roadmap-details/:roadmapId/add/new-details"
            element={<AddRoadmapDetailsForm />}
          ></Route>
          <Route
            path="/roadmap-details/:roadmapId/edit-details/:id"
            element={<AddRoadmapDetailsForm />}
          ></Route>
          <Route path="/edit-roadmap/:id" element={<FormModal />}></Route>
        </Routes>
    </>
  );
}
