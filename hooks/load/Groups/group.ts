
export default async function loadG(
  setGroupInfo: (
    value:
      | {
          id: string;
          name: string;
          adminId: string;
          admin: {
            username: string;
            image: string | null;
          };
          _count: {
            members: number;
            todos: number;
          };
        }[]
      | ((
          prevState:
            | {
                id: string;
                name: string;
                adminId: string;
                admin: {
                  username: string;
                  image: string | null;
                };
                _count: {
                  members: number;
                  todos: number;
                };
              }[]
            | null,
        ) =>
          | {
              id: string;
              name: string;
              adminId: string;
              admin: {
                username: string;
                image: string | null;
              };
              _count: {
                members: number;
                todos: number;
              };
            }[]
          | null)
      | null,
  ) => void,
) {
  const res = await fetch("/api/dashboard/Groups");
  const data = await res.json();
  setGroupInfo(data.Groups);
}
