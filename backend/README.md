## Fashion in Time API

FastAPI backend with SQLite persistence by default. Public product browsing is under `/api/v1/products`; customer routes use bearer-token authentication, and product, inventory, order, and analytics administration is under `/api/v1/admin`.

### Setup

From this directory, create and activate a virtual environment, then install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Set a unique `SECRET_KEY` in `.env` before running outside local development. Start the API with:

```bash
uvicorn app.main:app --reload
```

Interactive API documentation is available at `/docs`. Tables are created on startup. Configure `DATABASE_URL` to use a production database and run a migration workflow before deploying schema changes.

### Administrator access

Public registration always creates a `customer`. Create the first administrator locally using the CLI; it prompts for the account details and never exposes role escalation over HTTP:

```bash
python -m app.cli create-admin
```

Authenticate at `POST /api/v1/auth/login`, then pass its bearer token to the `/api/v1/admin` routes. The account must have `role="admin"`.

### Admin endpoints

- `GET /api/v1/admin/dashboard` and `/analytics`
- `GET /api/v1/admin/inventory`
- `POST /api/v1/admin/products`, `PATCH /products/{id}`, `DELETE /products/{id}`
- `PATCH /api/v1/admin/products/{id}/inventory?stock_quantity=...`
- `GET /api/v1/admin/orders`, `PATCH /orders/{id}/status`, `POST /orders/{id}/cancel`

Product deletion is soft deletion. Cancelling a pending order restores its reserved stock; paid orders cannot be cancelled until a refund workflow exists. Stripe and M-Pesa credentials are configurable, but payment provider calls intentionally return `501` until provider verification and webhook handling are implemented. Support delivery similarly returns `503` until an email/ticket provider is configured.
