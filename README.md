Title: Make ProblemFinder Fully Functional

Turn my existing ProblemFinder website into a real working full-stack application. Do NOT redesign or remove the existing premium UI unless necessary.

CORE PURPOSE:
ProblemFinder helps users discover real-world problems worth solving and turns those problems into validated business opportunities.

TECH STACK:
- Next.js
- TypeScript
- Tailwind CSS
- Supabase for database and authentication
- Server-side API routes for AI requests
- Environment variables for all secret API keys
- Mobile-first responsive design

FUNCTIONAL FEATURES:

1. USER AUTHENTICATION
Create:
- Sign up
- Login
- Logout
- Forgot password
- User profile

Use Supabase Authentication.

2. SUBMIT A PROBLEM
Create a working "Submit Problem" form with:
- Problem title
- Detailed description
- Category
- Country
- City/location
- Optional voice input
- Anonymous submission option

When submitted:
- Validate the form
- Save the problem to Supabase
- Show a success message
- Redirect to the problem details page

3. PROBLEM DATABASE
Create a Supabase table called problems with:
- id
- user_id
- title
- description
- category
- country
- city
- anonymous
- demand_score
- opportunity_score
- solvability_score
- trend_score
- status
- ai_summary
- ai_business_ideas
- created_at
- updated_at

4. AI PROBLEM ANALYSIS
When a new problem is submitted, send the problem to a secure server-side AI endpoint.

The AI should analyze:
- How serious is the problem?
- How frequently might people experience it?
- How many people could potentially need a solution?
- How difficult would it be to solve?
- Are people already paying for solutions?
- Is the problem growing?
- Possible business opportunities

Return structured JSON:
{
  "demand_score": 0-100,
  "opportunity_score": 0-100,
  "solvability_score": 0-100,
  "trend_score": 0-100,
  "summary": "...",
  "target_customers": ["..."],
  "business_ideas": ["..."],
  "recommended_solution": "..."
}

Save these AI results to Supabase.

5. OPPORTUNITY SCORE
Calculate an overall opportunity score from:
- Demand
- Trend
- Solvability
- Potential market

Display the score prominently on each problem.

6. DASHBOARD
Make these sections functional:
- Trending Problems
- Fast-Growing Problems
- Most Requested Solutions
- Problems Near You
- High Business Potential
- Recently Discovered

All sections must retrieve real data from Supabase instead of hardcoded demo data.

7. SEARCH
Create working search across:
- Problem title
- Description
- Category
- Location

8. FILTERS
Allow filtering by:
- Category
- Location
- Opportunity score
- Demand score
- Date

9. PROBLEM DETAILS
Each problem should have its own page showing:
- Problem
- Description
- Category
- Location
- Opportunity score
- Demand score
- Trend score
- Solvability score
- AI analysis
- Target customers
- Business ideas
- Recommended solution

10. VOTING / VALIDATION
Allow users to:
- Upvote a problem
- Say "I have this problem too"
- Follow a problem

Use Supabase tables for these interactions.

11. SECURITY
- Never expose AI API keys in frontend code.
- Use environment variables.
- Use Supabase Row Level Security.
- Users must not be able to modify other users' private data.
- Validate all inputs server-side.
- Protect API endpoints from abuse.

12. DEMO DATA
Create realistic seed/demo data so the dashboard looks useful on first launch, but clearly separate demo data from real user submissions.

13. ERROR HANDLING
Every database/API request must have:
- Loading state
- Error state
- Empty state
- Success state

14. IMPORTANT
Do not create fake functionality.
Do not use hardcoded results where database functionality is required.
Every button that claims to perform an action must actually perform that action.

After implementation, provide:
- All required files
- Supabase SQL schema
- Environment variables required
- Setup instructions
- Instructions for running locally
- Instructions for deploying to production

Make the application production-ready, mobile-first, fast, clean, premium and accessible.
