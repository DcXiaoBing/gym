# Database design

## athentication & authorization

- User
  - common user
  - coach
  - manager - no hurry
  - boss - no hurry
- User Profile
- User Detail
  - Membership! just use a time stamp or something
  - put member ship and purchase related thing on user table?

## Purchase

- Cart!
- Order
- Purchase(OrderProduct)
- Product
  - id
  - name
  - price

## Training

- Public class
  - class table
    - date, time
    - maximum count of registration
  - registration table
    - class id
    - user id
    - status -> canceled or not
- Private reservation (Refer the clinic table)
  - reservation table
    - date, time
    - userid, coach id
