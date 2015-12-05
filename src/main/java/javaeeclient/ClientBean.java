package javaeeclient;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.Response;

/**
 * Created by diego on 05/12/15.
 */
public class ClientBean {

    public void clientAccess() {

        String user = "admin";
        String password = "78fa095d-3f4c-48b1-ad50-e24c31d5cf35";

        String path = "http://localhost:8001/";

        Client client = ClientBuilder.newClient();

        Response response = client.target("path")
                .register(new ClientAuthenticator(user, password))
                .request().get();

        if (response.getStatus() == Response.Status.OK.getStatusCode()) {
            //Sucesso
        }
    }

}
