- enviroment variable

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080'
};

PRODUCT_API_URL = `${environment.API_URL}/products`;

- POST /login -> form data
login(user: User): Observable<{success: boolean, user: User}> {
    const httpParams: HttpParams = new HttpParams()
      .append('username', user.username)
      .append('password', user.password);
    return this.http.post<{success: boolean, user: User}>(`${this.AUTH_API_URL}/login`, httpParams, {withCredentials: true})
      .pipe(
        map((res: {success: boolean, user: User}) => {
          this.userSubject.next(res.user);
          return res;
        })
      );
  }


  addOrder(order: Order): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/orders`, order, {withCredentials: true});
  }
- when we send an request which requires authorization, we are supposing to let the cookie to be sent to server. however client's domain is localhost:4200/3000 and server domain is localhost:8080. cookie is not sent to server if port numbers are different. so for those requests, we need to set the {withCredentials: true} flag(header). cookie will be sent normally

- {withCredentials: true} 发 cookie both in Angular, React

- stringify 转 json 到 stirng(form格式)
import qs from 'qs';
export function login(user, callback) {
  const promise = axios.post(`${API_URL}/login`, qs.stringify(user), {withCredentials: true})
    .then(res => {
      callback(res);
      return res;
    });
  return {
    type: LOGIN,
    payload: promise
  }
}

- after refresh browser in angular/react project, angular service and react store will be cleared and recreated
- login -> save logged in user in angular's service/react store -> when refresh, info will lost

GET /checklogin with credentials
Use this to get user info that has logged in

Angular subject cache user in angular application
guard service: protect route. e.g. Admin route

in React, send GET/checklogin in index.js
handle it and init the store

-------------

- local storage

Angular
https://github.com/highcharts/highcharts-angular
React
https://recharts.org/en-US/
https://pro.ant.design/docs/graph

PDF
email

---------

s3: simple storage service
kind of a web drive/network drive(onedrive, google drive)
size limit: 50GB
why: we want to store static files(images, audios, vidoes)
create a s3 bucket(folder)
by default, bucket is private which means nobody can access any filds in the bucket.
we already turned on "allow changes to public access"
then we will use bucket policy to enable public access
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicRead",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::examplebucket/*"]
    }
  ]
}

---------

postgreSQL

aws now support 11

<dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
        </dependency>
# PostgreSQL settings
spring.datasource.url=jdbc:postgresql://localhost:5432/msi
spring.datasource.username=msi
spring.datasource.password=mercury
spring.jpa.hibernate.ddl-auto=none
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false


choose serial as id type
in java, ORM:
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private long id;

choose number for id type(primary key)
advanced -> identity column -> column sequence
go to sequence -> change cache size to be "no cache"
@Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQ")
    @SequenceGenerator(name = "SEQ", sequenceName = "MSI_USER_SEQ", allocationSize = 1)
    private long id;

pgadmin

1992910Wang

store image to S3, then use url to access image. DB store url
