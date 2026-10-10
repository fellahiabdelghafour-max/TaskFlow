   
   export default async function loadP(setTBP:(value: {
    name: "High" | "Medium" | "Low";
    value: number;
    color: string;
}[] | ((prevState: {
    name: "High" | "Medium" | "Low";
    value: number;
    color: string;
}[] | null) => {
    name: "High" | "Medium" | "Low";
    value: number;
    color: string;
}[] | null) | null) => void) {
      const res = await fetch("/api/dashboard/priority");
      const data = await res.json();
      setTBP(data);
    }
