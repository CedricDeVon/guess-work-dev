<h1>GuessWork</h1>
<p>A Mobile-based Blindfold Chess Training Platform</p>
<br/>
<table cellpadding="0" cellspacing="0" style="width: 80%;"> 
    <tr>
        <td valign="top" style="width: 70%;">
            <table cellpadding="1" cellspacing="0" style="width: 100%;">
                <thead>
                    <tr>
                        <th>Internal Release Code</th>
                        <th>Date Released</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>GW.010.001</td>
                        <td>2025-03-11</td>
                    </tr>
                    <tr>
                        <td>GW.010.002</td>
                        <td>2025-04-07</td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
</table>
<h2>GW.010.001 Release Notes</h2>
<ul>
    <li><h3>Initial commit</h3>
        <ul>
            <li>Initial Project Setup</li>
            <li>Initial Production Deployment</li>
        </ul>
    </li>
</ul>
<br/>
<h2>GW.010.002 Release Notes</h2>
<ul>
    <li><h3>Continued User Interface Implementation</h3>
        <ul>
            <li>Root
                <ul>
                    <li>Index</li>
                    <li>Not Found</li>
                </ul>
            </li>
            <li>Auth
                <ul>
                    <li>Login</li>
                    <li>Signup</li>
                </ul>
            </li>
            <li>User
                <ul>
                    <li>Tabs
                        <ul>
                            <li>Insights</li>
                            <li>More</li>
                            <li>Play</li>
                            <li>Training</li>
                        </ul>
                    </li>
                    <li>About</li>
                    <li>Account New Password</li>
                    <li>Account Profile</li>
                    <li>Achievements</li>
                    <li>Leaderboards</li>
                    <li>Notifications</li>
                    <li>Styles</li>
                </ul>
            </li>
            <li>Components
                <ul>
                    <li>Branding Footer</li>
                    <li>Branding Logo</li>
                    <li>Branding Title</li>
                    <li>Common Header</li>
                    <li>Common Picker</li>
                    <li>Confirmation Alert Dialog</li>
                    <li>Eye Icon</li>
                    <li>Large Application Logo</li>
                    <li>Loading Spinner Icon</li>
                    <li>Small Application Logo</li>
                </ul>
            </li>
            <li>Hooks
                <ul>
                    <li>useDisableComponentsDuringNavigation</li>
                    <li>useListenToNetwork</li>
                    <li>usePreventBackPress</li>
                </ul>
            </li>
        </ul>
    </li>
    <li><h3>Initial Implementation Of An Offline/Online Network Handling System</h3>
        <ul>
            <li>The application will now be able to listen to network events. The system for displaying network connection status however is still under development.</li>
            <li>This system will also utilize a JWT localStorage-like approach to store user account-related data for authentication, which will be extracted when a successful network connection has been re-established.</li>
        </ul>
    </li>
    <li><h3>Integration With The Back-End</h3>
        <ul>
            <li>Login</li>
            <li>Signup</li>
            <li>Account New Password</li>
            <li>Account Logout</li>
        </ul>
    </li>
    <li><h3>Bugfixes</h3>
        <ul>
            <li>Production Deployment
                <ul>
                    <li>Successfully identified the custom .env security feature as the culprit for crashing production builds. Said feature is disabled and a more reliable version is currently in the works.</li>
                </ul>
            </li>
        </ul>
    </li>
    <li><h3>Code Refactoring</h3>
        <ul>
            <li>/app</li>
            <li>/assets</li>
            <li>/components</li>
            <li>/library</li>
            <li>/store</li>
            <li>/utils</li>
        </ul>
    </li>
    <li><h3>Commit Messages</h3>
        <ul>
            <li>Updated Application Configuration Settings And Repo Documentation</li>
            <li>Attempting To Deploy After Assumed Bugfix Which Crashes The App And Displays A White Screen</li>
            <li>Continued Production Bugfix Attempt Via Modifying Configuration Settings and Configuration Handlers</li>
            <li>Continued Production Bugfix Via Inspecting the SupabaseAPI, EnvironmentConfiguration, and SupabaseDatabase Classes</li>
            <li>Attempted To Fix Navigation Bug On Production Via Impelementing Minor Snippets From The Development Version To Its Production Counterpart</li>
            <li>Merge branch 'bugfix' of https://github.com/CedricDeVon/guess-work-dev into bugfix</li>
            <li>Continued Navigation Bugfix</li>
            <li>Attempted To Fix The Nvigation Bug On Production Via Pre-Loading Font Imports</li>
            <li>Attempted To Fix The Navigation Bug On Production Via Adding _layout.tsx Inside 'auth' And 'user' Folders</li>
            <li>Fixed Navigation Bug</li>
            <li>Integrated Log-In, Sign-Up, Log-Out, and Reset Password</li>
            <li>Improved .env security</li>
        </ul>
    </li>
</ul>
<h2>Important Links:</h2>
<ul>
    <li><a href="https://github.com/CedricDeVon/guess-work">Design Specs</a></li>
    <li><a href="https://www.figma.com/design/S8B86q5oUa02bfXbMJahHY/GuessWork?t=ceUzhNyRSZplemoQ-0">User Interface Design</a></li>
</ul>
