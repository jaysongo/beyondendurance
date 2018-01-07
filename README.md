# Beyond Endurance
## Plan. Train. Compete.

### About
For more information about this project, check out the official page
https://jaysongo.github.io/beyondendurance/


### Running Locally
This is a dotnetcore/angular application.

1. Clone the repository
    ```
    git clone https://github.com/jaysongo/beyondendurance.git
    cd beyondendurance
    ```

    Then, jump into the source directory
    ```
    cd src
    ```
2. Download dependencies
    ```
    npm i
    dotnet restore
    ```
3. Run the application
    ```
    dotnet run
    ```
4. Load the application on localhost:5000

## Testing
There are two tiers to this application that requires unit and integration tests.

### UI Tests
Run the UI tests by running karma
```
npm test
```

### API Tests
Run the API tests by running xunit
```
dotnet test
```
