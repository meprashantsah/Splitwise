# Splitwise
Splitwise helps people track shared expenses and figure out who owes whom.


## Setup Instructions

## For Server
### 1. Clone the repository

git clone https://github.com/meprashantsah/Splitwise.git
cd splitwise-server


### 2. Create a virtual environment

python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate


### 3. Install dependencies

pip install -r requirements.txt


### 4. Run the Server

uvicorn app.main:app --reload


## For Client
cd splitwise-server

### 1. Install dependencies
npm install

### 4. Run the Server
npm run dev
