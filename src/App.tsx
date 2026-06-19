import { Formly } from "./components/form/Formly";

type FormData = {
  fullName: string;
  email: string;
  dob: Date | null;
};

function App() {
  const initialData = {
    fullName: "Jane",
    email: "jane.doe@example.com",
    dob: new Date("1985-06-09"),
  };

  return (
    <div style={{ width: "50%", margin: "auto", marginTop: "20%" }}>
      <Formly
        initialData={initialData}
        submitHandler={async (data: FormData) => {
          console.log("Form data", data, data.dob);
        }}
      >
        <Formly.Group
          title="Text & Personal Info Inputs"
          className="form-group"
        >
          <Formly.Input
            inputType="text"
            id="fullName"
            label="Full Name"
            placeholder="John Doe"
            defaultValue={initialData.fullName}
            required
          />
          <Formly.Input
            inputType="text"
            id="email"
            label="Email"
            placeholder="example@domain.com"
            autoComplete="email"
            defaultValue={initialData.email}
            required
          />
          <Formly.Input
            inputType="date"
            id="dob"
            label="Date of Birth"
            name="dob"
            placeholder="Date of birth"
            defaultValue={String(initialData.dob)}
            required
          />
        </Formly.Group>
      </Formly>
    </div>
  );
}

export default App;
