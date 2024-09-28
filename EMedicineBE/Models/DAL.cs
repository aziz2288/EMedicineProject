using System.Data;
using System.Data.SqlClient;

namespace EMedicineBE.Models
{
    public class DAL
    {
        public Response Register(Users user, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_register", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
            cmd.Parameters.AddWithValue("@LastName", user.LastName);
            cmd.Parameters.AddWithValue("@Password", user.Password);
            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@Fund", 0);
            cmd.Parameters.AddWithValue("@Status", "Pending");
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if(i >  0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User register successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User register faild";
            }
            return response;
        }
        public Response Login(Users user, SqlConnection connection)
        {
            SqlDataAdapter adapter = new SqlDataAdapter("sp_login", connection);
            adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
            adapter.SelectCommand.Parameters.AddWithValue("@Email", user.Email);
            adapter.SelectCommand.Parameters.AddWithValue("@Password", user.Password);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            Users users = new Users();
            Response response = new Response();
            if(dt.Rows.Count > 0)
            {
                users.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                users.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                users.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                users.Email = Convert.ToString(dt.Rows[0]["Email"]);
                users.Type = Convert.ToString(dt.Rows[0]["Type"]);
                response.StatusCode = 200;
                response.StatusMessage = "User is valid !";
                response.user = user;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User is invalid !";
                response.user = null;
            }
            return response;
        }
        public Response ViewUser(Users user, SqlConnection connection)
        {
            SqlDataAdapter adapter = new SqlDataAdapter("sp_viewUser", connection);
            adapter.SelectCommand.CommandType= CommandType.StoredProcedure;
            adapter.SelectCommand.Parameters.AddWithValue("@Id", user.Id);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            Users users = new Users();
            Response response = new Response();
            if(dt.Rows.Count > 0)
            {
                users.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                users.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                users.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                users.Email = Convert.ToString(dt.Rows[0]["Email"]);
                users.Type = Convert.ToString(dt.Rows[0]["Type"]);
                users.Fund = Convert.ToDecimal(dt.Rows[0]["Fund"]);
                users.CreatedOn = Convert.ToDateTime(dt.Rows[0]["CreatedOn"]);
                users.Password = Convert.ToString(dt.Rows[0]["Password"]);
                response.StatusCode = 200;
                response.StatusMessage = "User exists !";
                response.user = user;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User does not exists !";
                response.user = null;
            }
            return response;
        }
        public Response UpdateProfile(Users user, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_updateProfile", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
            cmd.Parameters.AddWithValue("@LastName", user.LastName);
            cmd.Parameters.AddWithValue("@Password", user.Password);
            cmd.Parameters.AddWithValue("@Email", user.Email);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if(i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "record updated successfully !";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "operation failed, try again !";
            }

            return response;
        }
        public Response AddToCart(Cart cart, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_AddToCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", cart.UserId);
            cmd.Parameters.AddWithValue("@UnitPrice", cart.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", cart.Discount);
            cmd.Parameters.AddWithValue("@Quntity", cart.Quntity);
            cmd.Parameters.AddWithValue("@TotalePrice", cart.TotalePrice);
            cmd.Parameters.AddWithValue("@MedicineId", cart.MedicineId);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if(i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Item added successfully !";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Item not added , try again !";
            }
            return response;
        }
        public Response PlaceOrder(Users user, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_PlaceOrder", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Id", user.Id);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "order has been placed successfully !";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "order could not be placed !";
            }
            return response;
        }
        public Response OrderList(Users user, SqlConnection connection)
        {
            List<Orders> listOrders = new List<Orders>();
            Response response = new Response();
            SqlDataAdapter adapter = new SqlDataAdapter("sp_OrderList", connection);
            adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
            adapter.SelectCommand.Parameters.AddWithValue("@Type", user.Type);
            adapter.SelectCommand.Parameters.AddWithValue("@Id", user.Id);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            if(dt.Rows.Count > 0)
            {
                for(int i=0; i<dt.Rows.Count; i++)
                {
                    Orders order = new Orders();
                    order.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    order.OrderNo = Convert.ToString(dt.Rows[i]["OrderNo"]);
                    order.OrderTotal = Convert.ToDecimal(dt.Rows[i]["OrderTotal"]);
                    order.OrderStatus = Convert.ToString(dt.Rows[i]["OrderStatus"]);
                    listOrders.Add(order);
                }
                if(listOrders.Count > 0) 
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Order details fetched !";
                    response.listOrders = listOrders;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Order details are not available !";
                    response.listOrders = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Order details are not available !";
                response.listOrders = null;
            }
            return response;
        }
        public Response AddUpdateMedicine(Medicines medicine, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_AddUpdateMedicine", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Name", medicine.Name);
            cmd.Parameters.AddWithValue("@Manufacturer", medicine.Manufacturer);
            cmd.Parameters.AddWithValue("@UnitPrice", medicine.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", medicine.Discount);
            cmd.Parameters.AddWithValue("@Quantity", medicine.Quantity);
            cmd.Parameters.AddWithValue("@ExpDate", medicine.ExpDate);
            cmd.Parameters.AddWithValue("@ImageUrl", medicine.ImageUrl);
            cmd.Parameters.AddWithValue("@Status", medicine.Status);
            cmd.Parameters.AddWithValue("@Type", medicine.Type);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Medicine inserted successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Medicine did not save, try again";
            }
            return response;
        }
        public Response UserList(SqlConnection connection)
        {
            List<Users> listUsers = new List<Users>();
            Response response = new Response();
            SqlDataAdapter adapter = new SqlDataAdapter("sp_UserList", connection);
            adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Users user = new Users();
                    user.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    user.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                    user.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                    user.Password = Convert.ToString(dt.Rows[i]["Password"]);
                    user.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    user.Fund = Convert.ToDecimal(dt.Rows[i]["Fund"]);
                    user.Status = Convert.ToInt32(dt.Rows[i]["Status"]);
                    user.CreatedOn = Convert.ToDateTime(dt.Rows[i]["CreatedOn"]);
                    listUsers.Add(user);
                }
                if (listUsers.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "User details fetched !";
                    response.listUsers = listUsers;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "User details are not available !";
                    response.listUsers = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User details are not available !";
                response.listOrders = null;
            }
            return response;
        }
    }
}
