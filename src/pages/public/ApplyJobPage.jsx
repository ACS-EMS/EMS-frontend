import { useParams } from "react-router-dom";

function ApplyJobPage() {

  const { jobId } = useParams();

  return (
    <div>

      <h1>Apply for Job</h1>

      <p>
        Applying for Job ID:
        {jobId}
      </p>

    </div>
  );
}

export default ApplyJobPage;