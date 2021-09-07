export class AppConfig {
  public static API_ENDPOINT='http://localhost:8080/api/v1/';
  public static API_ADMIN_ENDPOINT='http://localhost:8081/api/v1/admin/';
  public static API_ANALYTICS_ENDPOINT='http://localhost:8082/api/v1/';
  public static TOKEN_HEADER_KEY = 'Authorization';
  public static AUTHENTICATION_SCHEME='Bearer ';

  public static TOKEN_KEY = 'AuthToken';
  public static USERNAME_KEY = 'AuthUsername';
  public static AUTHORITIES_KEY = 'AuthAuthorities';
  public static ID_KEY = 'AuthId';

  private static API_BASE_URL = "http://localhost:8080/";
  private static OAUTH2_URL = AppConfig.API_BASE_URL + "oauth2/authorization/";
  private static REDIRECT_URL = "?redirect_uri=http://localhost:4200/login";

  public static GOOGLE_AUTH_URL = AppConfig.OAUTH2_URL + "google" + AppConfig.REDIRECT_URL;
  public static FACEBOOK_AUTH_URL = AppConfig.OAUTH2_URL + "facebook" + AppConfig.REDIRECT_URL;
  public static GITHUB_AUTH_URL = AppConfig.OAUTH2_URL + "github" + AppConfig.REDIRECT_URL;

}
