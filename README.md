<h1 align="center">Beyond Endurance</h2>
<h2 align="center">Plan. Train. Compete.</h2>

## Background
Beyond Endurance is an open-source application that provides tools for endurance athletes to help them meet their goals.

#### Calendar
Use the calendar to generate training plans leading up to a race. You can use predefined training plans, or customize your own.

#### Connect
Connect the app with your favorite activity tracking sites to compare your planned and actual activities.

#### Socialize
Socialize your activities by logging your notes.

#### Share
Share your training plan with your friends. This works best when _y'all_ are training for the same race with the same goals.

#### ...And many more
The best part about Beyond Endurance is that it is built with an endurance athlete's mindset. Furthermore, we welcome all constructive feedback and new ideas. This helps Beyond Endurance to continue to grow with new features.

## Running Locally
This is a dotnetcore/angular application.

1. Clone the repository
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
