
## SDK Man  
- this can be used to use muliple version of java ror scala or groovy

1. install

   ```bash
    curl -s "https://get.sdkman.io" | bash
    ```

2. check version
   - `sdk version`

3. update
   - `sdk selfupdate force`



### Usage

1. install latest version
   `sdk install java`

2. install specific version
   `sdk install java 3.4.2`


3. remove version
   `sdk uninstall java 3.4.2`

4. list 
   `sdk list`

5. list candidate versions for java
   `sdk list java`

6. use version
   `sdk use java 3.4.2`

7. default version
   `sdk default java 3.4.2`

8. current version
   `sdk current java`


### Specific version in project
1. create `.sdkmanrc` file in the root folder
    - or create file with cmd `sdk env init`
2. add version info
   ```
    java=21.0.4-tem
   ```