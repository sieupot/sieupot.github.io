# Setting up the dev environment for Eclipse on Windows

1. download, install and setup Apache Tomcat (used to run the project and navigate in the browser)
    1. set the Apache to run on **https**:
       1. generate a certificate file called `localhost-rsa.jks` by running the following command in the terminal, in the user's home directory:
          ```shell
              $  keytool -genkey -noprompt -alias tomcat-localhost -keyalg RSA -keystore localhost-rsa.jks -keypass 123123123 -storepass 123123123 -dname "CN=tomcat-cert, OU=Dev, O=, L=, ST=, C=RO"
          ```
       2. in `$[TOMCAT_HOME]/conf/server.conf`, add/uncomment and update the https connector:

              <Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
                         maxThreads="150" SSLEnabled="true" >
                  <UpgradeProtocol className="org.apache.coyote.http2.Http2Protocol" />
                  <SSLHostConfig>
                      <Certificate certificateKeystoreFile="/Users/tgutan/localhost-rsa.jks"
                                   certificateKeystorePassword="123123123"
                                   type="RSA" />
                  </SSLHostConfig>
              </Connector>

2. configure the Apache server in `Eclipse -> Preferences -> Server -> Runtime environments`
3. define a new Apache Tomcat server Run Configuration and in the Servers view make sure the Admin Port is set to an actual value (i.e.: 8005)
4. in the workspace's folder: `[path_to_workspace]/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/webapps` create a symbolic link named sieupot to the root folder of the project
   in Windows, in a Command Prompt **as Administrator**:
    ```shell
    $ mklink /D sieupot ..\..\..\..\..\sieupot\
    ```
5. launch web app in the browser, by going to:
   1. [**http**://localhost:**8080**/sieupot](http://localhost:8080/sieupot)

       **or**
   2. [**https**://localhost:**8443**/sieupot](https://localhost:8443/sieupot)
