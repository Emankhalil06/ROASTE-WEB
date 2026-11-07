
import { useState } from "react";
import "./Cart.css";

function Cart({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  subtotal,
  deliveryFee,
  total,
  language,
}) {
  const [checkout, setCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    city: "",
    area: "",
    address: "",
    notes: "",
    payment: "cash",
  });

  // Generate one real order number for this order
  const [orderNumber] = useState(
    `RO-${Math.floor(1000 + Math.random() * 9000)}`
  );

  if (!isOpen) return null;

  const isArabic = language === "ar";

  const updateCustomer = (field, value) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handleBackToCart = () => {
    setCheckout(false);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();

    if (
      !customer.name ||
      !customer.phone ||
      !customer.city ||
      !customer.area ||
      !customer.address
    ) {
      return;
    }

    const order = {
      orderNumber,
      customer,
      items: cart,
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toISOString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("roasteOrders")) || [];

    localStorage.setItem(
      "roasteOrders",
      JSON.stringify([
        ...existingOrders,
        order,
      ])
    );

    setOrderConfirmed(true);
  };

  const resetOrder = () => {
    setCheckout(false);
    setOrderConfirmed(false);

    setCustomer({
      name: "",
      phone: "",
      city: "",
      area: "",
      address: "",
      notes: "",
      payment: "cash",
    });

    onClose();
  };

  return (
    <div
      className="cart-overlay"
      onClick={onClose}
    >
      <aside
        className={`cart-drawer ${
          isArabic ? "cart-ar" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* =========================
            HEADER
        ========================= */}

        <div className="cart-header">

          <div>
            <span className="cart-eyebrow">
              {orderConfirmed
                ? isArabic
                  ? "تم تأكيد الطلب"
                  : "ORDER CONFIRMED"
                : checkout
                ? isArabic
                  ? "إتمام الطلب"
                  : "CHECKOUT"
                : isArabic
                ? "طلبك"
                : "YOUR ORDER"}
            </span>

            <h2>
              {orderConfirmed
                ? isArabic
                  ? "شكرًا لك"
                  : "Thank You"
                : checkout
                ? isArabic
                  ? "بيانات الطلب"
                  : "Your Details"
                : isArabic
                ? "سلة المشتريات"
                : "Your Cart"}
            </h2>
          </div>

          <button
            className="cart-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        {/* =========================
            EMPTY CART
        ========================= */}

        {cart.length === 0 &&
        !checkout &&
        !orderConfirmed ? (
          <div className="cart-empty">

            <span>☕</span>

            <h3>
              {isArabic
                ? "السلة فارغة"
                : "Your cart is empty"}
            </h3>

            <p>
              {isArabic
                ? "أضف قهوتك المفضلة للبدء."
                : "Add your favorite coffee to get started."}
            </p>

          </div>
        ) : orderConfirmed ? (

          /* =========================
             ORDER CONFIRMED
          ========================= */

          <div className="order-success">

            <div className="success-icon">
              ✓
            </div>

            <span className="success-label">
              {isArabic
                ? "تم استلام طلبك"
                : "ORDER RECEIVED"}
            </span>

            <h3>
              {isArabic
                ? `شكرًا ${customer.name}`
                : `Thank you, ${customer.name}`}
            </h3>

            <p>
              {isArabic
                ? "تم استلام طلبك وسيتم تحضيره قريبًا."
                : "Your order has been received and is being prepared."}
            </p>

            {/* ORDER NUMBER */}

            <div className="order-number">

              <span>
                {isArabic
                  ? "رقم الطلب"
                  : "ORDER NUMBER"}
              </span>

              <strong>
                #{orderNumber}
              </strong>

            </div>

            {/* ORDER DETAILS */}

            <div className="confirmed-items">

              <span className="confirmed-items-title">
                {isArabic
                  ? "تفاصيل الطلب"
                  : "YOUR ORDER"}
              </span>

              {cart.map((item) => (
                <div
                  className="confirmed-item"
                  key={item.id}
                >

                  <div>
                    <span>
                      {item.name}
                    </span>

                    <small>
                      × {item.quantity}
                    </small>
                  </div>

                  <strong>
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)} JD
                  </strong>

                </div>
              ))}

            </div>

            {/* DELIVERY DETAILS */}

            <div className="confirmed-delivery">

              <span className="confirmed-items-title">
                {isArabic
                  ? "بيانات التوصيل"
                  : "DELIVER TO"}
              </span>

              <p>
                <strong>
                  {customer.name}
                </strong>

                <br />

                {customer.phone}

                <br />

                {customer.city}

                <br />

                {customer.area}

                <br />

                {customer.address}

                {customer.notes && (
                  <>
                    <br />
                    <span className="delivery-note">
                      {isArabic
                        ? "ملاحظات: "
                        : "Notes: "}
                      {customer.notes}
                    </span>
                  </>
                )}
              </p>

            </div>

            {/* PAYMENT */}

            <div className="confirmed-delivery">

              <span className="confirmed-items-title">
                {isArabic
                  ? "طريقة الدفع"
                  : "PAYMENT"}
              </span>

              <p>
                {customer.payment === "cash"
                  ? isArabic
                    ? "الدفع عند الاستلام"
                    : "Cash on Delivery"
                  : customer.payment}
              </p>

            </div>

            {/* TOTAL */}

            <div className="confirmation-total">

              <span>
                {isArabic
                  ? "الإجمالي"
                  : "TOTAL"}
              </span>

              <strong>
                {total.toFixed(2)} JD
              </strong>

            </div>

            <button
              className="checkout-button"
              onClick={resetOrder}
            >
              {isArabic
                ? "العودة للموقع"
                : "BACK TO WEBSITE"}

              <span>→</span>
            </button>

          </div>

        ) : checkout ? (

          /* =========================
             CHECKOUT
          ========================= */

          <div className="checkout-content">

            <button
              className="back-to-cart"
              onClick={handleBackToCart}
            >
              ←{" "}
              {isArabic
                ? "العودة للسلة"
                : "BACK TO CART"}
            </button>

            <form
              onSubmit={handleConfirmOrder}
            >

              {/* CUSTOMER DETAILS */}

              <div className="checkout-section">

                <span className="checkout-label">
                  {isArabic
                    ? "01 — معلومات العميل"
                    : "01 — CUSTOMER DETAILS"}
                </span>

                <div className="checkout-field">

                  <label>
                    {isArabic
                      ? "الاسم الكامل"
                      : "Full Name"}
                  </label>

                  <input
                    type="text"
                    placeholder={
                      isArabic
                        ? "اكتب اسمك"
                        : "Enter your full name"
                    }
                    value={customer.name}
                    onChange={(e) =>
                      updateCustomer(
                        "name",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    {isArabic
                      ? "رقم الهاتف"
                      : "Phone Number"}
                  </label>

                  <input
                    type="tel"
                    placeholder="07XXXXXXXX"
                    value={customer.phone}
                    onChange={(e) =>
                      updateCustomer(
                        "phone",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>

              {/* DELIVERY LOCATION */}

              <div className="checkout-section">

                <span className="checkout-label">
                  {isArabic
                    ? "02 — موقع التوصيل"
                    : "02 — DELIVERY LOCATION"}
                </span>

                <div className="checkout-field">

                  <label>
                    {isArabic
                      ? "المحافظة"
                      : "City"}
                  </label>

                  <select
                    value={customer.city}
                    onChange={(e) =>
                      updateCustomer(
                        "city",
                        e.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      {isArabic
                        ? "اختر المحافظة"
                        : "Select city"}
                    </option>

                    <option value="Amman">
                      {isArabic
                        ? "عمّان"
                        : "Amman"}
                    </option>

                    <option value="Zarqa">
                      {isArabic
                        ? "الزرقاء"
                        : "Zarqa"}
                    </option>

                    <option value="Irbid">
                      {isArabic
                        ? "إربد"
                        : "Irbid"}
                    </option>

                  </select>

                </div>

                <div className="checkout-field">

                  <label>
                    {isArabic
                      ? "المنطقة"
                      : "Area"}
                  </label>

                  <input
                    type="text"
                    placeholder={
                      isArabic
                        ? "مثال: الجبيهة"
                        : "Example: Al Jubaiha"
                    }
                    value={customer.area}
                    onChange={(e) =>
                      updateCustomer(
                        "area",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    {isArabic
                      ? "العنوان بالتفصيل"
                      : "Full Address"}
                  </label>

                  <textarea
                    rows="3"
                    placeholder={
                      isArabic
                        ? "الشارع، رقم المبنى، الطابق..."
                        : "Street, building number, floor..."
                    }
                    value={customer.address}
                    onChange={(e) =>
                      updateCustomer(
                        "address",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    {isArabic
                      ? "ملاحظات للسائق"
                      : "Delivery Notes"}
                  </label>

                  <textarea
                    rows="2"
                    placeholder={
                      isArabic
                        ? "أي ملاحظات إضافية..."
                        : "Any additional instructions..."
                    }
                    value={customer.notes}
                    onChange={(e) =>
                      updateCustomer(
                        "notes",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* PAYMENT */}

              <div className="checkout-section">

                <span className="checkout-label">
                  {isArabic
                    ? "03 — طريقة الدفع"
                    : "03 — PAYMENT"}
                </span>

                <label className="payment-option">

                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={
                      customer.payment ===
                      "cash"
                    }
                    onChange={(e) =>
                      updateCustomer(
                        "payment",
                        e.target.value
                      )
                    }
                  />

                  <span>
                    {isArabic
                      ? "الدفع عند الاستلام"
                      : "Cash on Delivery"}
                  </span>

                </label>

                <label className="payment-option disabled">

                  <input
                    type="radio"
                    disabled
                  />

                  <span>
                    {isArabic
                      ? "الدفع الإلكتروني — قريبًا"
                      : "Online Payment — Coming Soon"}
                  </span>

                </label>

              </div>

              {/* ORDER SUMMARY */}

              <div className="checkout-summary">

                <div>

                  <span>
                    {isArabic
                      ? "المجموع الفرعي"
                      : "Subtotal"}
                  </span>

                  <strong>
                    {subtotal.toFixed(2)} JD
                  </strong>

                </div>

                <div>

                  <span>
                    {isArabic
                      ? "التوصيل"
                      : "Delivery"}
                  </span>

                  <strong>
                    {deliveryFee.toFixed(2)} JD
                  </strong>

                </div>

                <div className="checkout-total">

                  <span>
                    {isArabic
                      ? "الإجمالي"
                      : "Total"}
                  </span>

                  <strong>
                    {total.toFixed(2)} JD
                  </strong>

                </div>

              </div>

              <button
                type="submit"
                className="checkout-button"
              >
                {isArabic
                  ? "تأكيد الطلب"
                  : "CONFIRM ORDER"}

                <span>→</span>
              </button>

            </form>

          </div>

        ) : (

          /* =========================
             CART
          ========================= */

          <div className="cart-body">

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.subtitle}
                    </p>

                    <span>
                      {item.price.toFixed(2)} JD
                    </span>

                    <div className="cart-quantity">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            -1
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    className="cart-remove"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

            {/* CART SUMMARY */}

            <div className="cart-summary">

              <div>

                <span>
                  {isArabic
                    ? "المجموع الفرعي"
                    : "Subtotal"}
                </span>

                <strong>
                  {subtotal.toFixed(2)} JD
                </strong>

              </div>

              <div>

                <span>
                  {isArabic
                    ? "التوصيل"
                    : "Delivery"}
                </span>

                <strong>
                  {deliveryFee.toFixed(2)} JD
                </strong>

              </div>

              <div className="cart-total">

                <span>
                  {isArabic
                    ? "الإجمالي"
                    : "Total"}
                </span>

                <strong>
                  {total.toFixed(2)} JD
                </strong>

              </div>

            </div>

            {/* CHECKOUT BUTTON */}

            <button
              className="checkout-button"
              onClick={handleCheckout}
            >
              {isArabic
                ? "متابعة لإتمام الطلب"
                : "PROCEED TO CHECKOUT"}

              <span>→</span>
            </button>

          </div>
        )}

      </aside>
    </div>
  );
}

export default Cart;
