import { Card } from "react-bootstrap";
import CardHeaderComponent from "./CardHeader";
import CardBodyComponent from "./CardBody";
import CardFooterComponent from "./CardFooter";
import { useEffect, useState } from "react";
import { UsersService } from "../../apis/clientV2/usersService";
import { useAuth } from "../../Context/AuthContext";

function OrderCardV2({ data }) {

  //consultamos a la api el usuario y la locacion a la api
  const [userClient, setUserClient] = useState(null)
  const [loadUserClient, setLoadUserClient] = useState(false)

  const { token } = useAuth()

  const usersService = new UsersService(token)
  useEffect(() => {
    const findUser = async () => {
      const user = await usersService.getByIdUser(data.userClientId)
      setUserClient(user.body)
      setLoadUserClient(false)
    }
    setLoadUserClient(true)
    findUser()
  }, [token])



  return (
    <Card style={{ width: "20rem" }}>
      <CardHeaderComponent
        userClient={userClient}
        loadUserClient={loadUserClient}
        data={data}
      />
      <CardBodyComponent
      />
      <CardFooterComponent />
    </Card>
  );
}

export { OrderCardV2 };
