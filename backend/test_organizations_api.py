"""
Automated API Test Suite for Organizations & RBAC
Run this script to test all Phase 3 functionality

Usage:
    python test_organizations_api.py

Requirements:
    pip install requests colorama
"""


import requests
from colorama import Fore, Style, init

# Initialize colorama for colored output
init(autoreset=True)

# Configuration
BASE_URL = "http://127.0.0.1:8000/api"
TEST_CREDENTIALS = {
    "username": "jabrahamjohns@gmail.com",  # Change this to your username
    "password": "Km@3108j"  # Change this to your password
}

class APITester:
    def __init__(self):
        self.token = None
        self.headers = {}
        self.test_org_id = None
        self.test_member_id = None
        self.passed = 0
        self.failed = 0

    def print_header(self, text):
        print(f"\n{Fore.CYAN}{'='*60}")
        print(f"{Fore.CYAN}{text}")
        print(f"{Fore.CYAN}{'='*60}{Style.RESET_ALL}")

    def print_test(self, name):
        print(f"\n{Fore.YELLOW}Testing: {name}{Style.RESET_ALL}")

    def print_success(self, message):
        self.passed += 1
        print(f"{Fore.GREEN}✓ PASS: {message}{Style.RESET_ALL}")

    def print_failure(self, message):
        self.failed += 1
        print(f"{Fore.RED}✗ FAIL: {message}{Style.RESET_ALL}")

    def print_info(self, message):
        print(f"{Fore.BLUE}ℹ INFO: {message}{Style.RESET_ALL}")

    def authenticate(self):
        """Test 1: Authentication"""
        self.print_header("TEST 1: AUTHENTICATION")
        self.print_test("Get JWT Token")

        try:
            response = requests.post(
                f"{BASE_URL}/token/",
                json=TEST_CREDENTIALS
            )

            if response.status_code == 200:
                data = response.json()
                self.token = data.get("access")
                self.headers = {"Authorization": f"Bearer {self.token}"}
                self.print_success("Authentication successful")
                self.print_info(f"Token: {self.token[:20]}...")
                return True
            else:
                self.print_failure(f"Authentication failed: {response.status_code}")
                self.print_info(f"Response: {response.text}")
                return False
        except Exception as e:
            self.print_failure(f"Authentication error: {str(e)}")
            return False

    def test_list_organizations(self):
        """Test 2: List My Organizations"""
        self.print_header("TEST 2: LIST MY ORGANIZATIONS")
        self.print_test("GET /api/organizations/my/")

        try:
            response = requests.get(
                f"{BASE_URL}/organizations/my/",
                headers=self.headers
            )

            if response.status_code == 200:
                orgs = response.json()
                self.print_success(f"Retrieved {len(orgs)} organization(s)")

                for org in orgs:
                    self.print_info(f"  - {org['name']} (ID: {org['id']}, Members: {org['member_count']})")
                    if not self.test_org_id:
                        self.test_org_id = org['id']

                return True
            else:
                self.print_failure(f"Failed to list organizations: {response.status_code}")
                return False
        except Exception as e:
            self.print_failure(f"Error: {str(e)}")
            return False

    def test_create_organization(self):
        """Test 3: Create New Organization"""
        self.print_header("TEST 3: CREATE ORGANIZATION")
        self.print_test("POST /api/organizations/create/")

        try:
            response = requests.post(
                f"{BASE_URL}/organizations/create/",
                headers=self.headers,
                json={
                    "name": "Automated Test Organization",
                    "description": "Created by automated test suite"
                }
            )

            if response.status_code == 201:
                org = response.json()
                self.print_success(f"Organization created: {org['name']} (ID: {org['id']})")
                self.test_org_id = org['id']  # Use new org for subsequent tests
                return True
            else:
                self.print_failure(f"Failed to create organization: {response.status_code}")
                self.print_info(f"Response: {response.text}")
                return False
        except Exception as e:
            self.print_failure(f"Error: {str(e)}")
            return False

    def test_get_organization(self):
        """Test 4: Get Organization Details"""
        self.print_header("TEST 4: GET ORGANIZATION DETAILS")
        self.print_test(f"GET /api/organizations/{self.test_org_id}/")

        if not self.test_org_id:
            self.print_failure("No organization ID available")
            return False

        try:
            response = requests.get(
                f"{BASE_URL}/organizations/{self.test_org_id}/",
                headers=self.headers
            )

            if response.status_code == 200:
                org = response.json()
                self.print_success(f"Retrieved organization: {org['name']}")
                self.print_info(f"  Owner: {org['owner_username']}")
                self.print_info(f"  Members: {org['member_count']}")
                self.print_info(f"  Tier: {org['subscription_tier']}")
                return True
            else:
                self.print_failure(f"Failed to get organization: {response.status_code}")
                return False
        except Exception as e:
            self.print_failure(f"Error: {str(e)}")
            return False

    def test_list_members(self):
        """Test 5: List Organization Members"""
        self.print_header("TEST 5: LIST ORGANIZATION MEMBERS")
        self.print_test(f"GET /api/organizations/{self.test_org_id}/members/")

        if not self.test_org_id:
            self.print_failure("No organization ID available")
            return False

        try:
            response = requests.get(
                f"{BASE_URL}/organizations/{self.test_org_id}/members/",
                headers=self.headers
            )

            if response.status_code == 200:
                members = response.json()
                self.print_success(f"Retrieved {len(members)} member(s)")

                for member in members:
                    user = member['user_details']
                    self.print_info(f"  - {user['username']} ({member['role']}) - Active: {member['is_active']}")
                    if member['role'] != 'owner':
                        self.test_member_id = member['id']

                return True
            else:
                self.print_failure(f"Failed to list members: {response.status_code}")
                return False
        except Exception as e:
            self.print_failure(f"Error: {str(e)}")
            return False

    def test_invite_member(self):
        """Test 6: Invite Team Member"""
        self.print_header("TEST 6: INVITE TEAM MEMBER")
        self.print_test(f"POST /api/organizations/{self.test_org_id}/invite/")

        if not self.test_org_id:
            self.print_failure("No organization ID available")
            return False

        # Try to invite another existing user
        invite_email = "mahmudabdul@gmail.com"  # Change if needed

        try:
            response = requests.post(
                f"{BASE_URL}/organizations/{self.test_org_id}/invite/",
                headers=self.headers,
                json={
                    "email": invite_email,
                    "role": "staff"
                }
            )

            if response.status_code == 201:
                member = response.json()
                self.print_success(f"Member invited: {invite_email} as {member['role']}")
                self.test_member_id = member['id']
                return True
            elif response.status_code == 400:
                error = response.json()
                if "already a member" in error.get('error', ''):
                    self.print_info("User already a member (expected if running multiple times)")
                    return True
                else:
                    self.print_failure(f"Invitation failed: {error.get('error')}")
                    return False
            elif response.status_code == 404:
                self.print_info(f"User {invite_email} not found (expected if user doesn't exist)")
                return True
            else:
                self.print_failure(f"Failed to invite member: {response.status_code}")
                return False
        except Exception as e:
            self.print_failure(f"Error: {str(e)}")
            return False

    def test_dashboard_summary(self):
        """Test 7: Dashboard Summary (Organization Filtering)"""
        self.print_header("TEST 7: DASHBOARD SUMMARY")

        # Test without org filter
        self.print_test("GET /api/events/dashboard-summary/ (all orgs)")

        try:
            response = requests.get(
                f"{BASE_URL}/events/dashboard-summary/",
                headers=self.headers
            )

            if response.status_code == 200:
                data = response.json()
                self.print_success("Dashboard data retrieved")
                self.print_info(f"  Total Events: {data.get('total_events', 0)}")
                self.print_info(f"  Total RSVPs: {data.get('total_rsvps', 0)}")

                revenue = data.get('total_revenue')
                if revenue is not None:
                    self.print_info(f"  Total Revenue: {revenue}")
                else:
                    self.print_info("  Revenue: Hidden (no finance permission)")

                return True
            else:
                self.print_failure(f"Failed to get dashboard: {response.status_code}")
                return False
        except Exception as e:
            self.print_failure(f"Error: {str(e)}")
            return False

    def test_my_events(self):
        """Test 8: Get My Events (Organization Filtered)"""
        self.print_header("TEST 8: GET MY EVENTS")
        self.print_test("GET /api/events/my-events/")

        try:
            response = requests.get(
                f"{BASE_URL}/events/my-events/",
                headers=self.headers
            )

            if response.status_code == 200:
                data = response.json()
                events = data.get('results', data)  # Handle pagination
                self.print_success(f"Retrieved {len(events)} event(s)")

                for event in events[:3]:  # Show first 3
                    self.print_info(f"  - {event['eventName']} (ID: {event['id']})")

                return True
            else:
                self.print_failure(f"Failed to get events: {response.status_code}")
                return False
        except Exception as e:
            self.print_failure(f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all tests in sequence"""
        print(f"\n{Fore.MAGENTA}{'='*60}")
        print(f"{Fore.MAGENTA}ORGANIZATIONS & RBAC API TEST SUITE")
        print(f"{Fore.MAGENTA}{'='*60}{Style.RESET_ALL}\n")

        # Check credentials
        if TEST_CREDENTIALS["password"] == "your_password_here":
            print(f"{Fore.RED}ERROR: Please update TEST_CREDENTIALS with your actual password{Style.RESET_ALL}")
            print(f"{Fore.YELLOW}Edit line 17-20 in this file{Style.RESET_ALL}")
            return

        # Run tests
        if not self.authenticate():
            print(f"\n{Fore.RED}Authentication failed. Cannot proceed with tests.{Style.RESET_ALL}")
            return

        self.test_list_organizations()
        self.test_create_organization()
        self.test_get_organization()
        self.test_list_members()
        self.test_invite_member()
        self.test_dashboard_summary()
        self.test_my_events()

        # Summary
        self.print_header("TEST SUMMARY")
        total = self.passed + self.failed
        print(f"\n{Fore.GREEN}Passed: {self.passed}/{total}{Style.RESET_ALL}")
        print(f"{Fore.RED}Failed: {self.failed}/{total}{Style.RESET_ALL}")

        if self.failed == 0:
            print(f"\n{Fore.GREEN}{'='*60}")
            print(f"{Fore.GREEN}ALL TESTS PASSED! ✓")
            print(f"{Fore.GREEN}{'='*60}{Style.RESET_ALL}\n")
        else:
            print(f"\n{Fore.YELLOW}Some tests failed. Review output above.{Style.RESET_ALL}\n")


if __name__ == "__main__":
    tester = APITester()
    tester.run_all_tests()
