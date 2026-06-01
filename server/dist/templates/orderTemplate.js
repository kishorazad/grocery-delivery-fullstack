const orderTemplate = ({ customerName, orderId, status, }) => {
    return `
    <div style="font-family:Arial;padding:40px;background:#f5f5f5;">

        <div style="
            max-width:600px;
            margin:auto;
            background:white;
            border-radius:20px;
            overflow:hidden;
        ">

            <div style="
                background:#ff7a00;
                padding:30px;
                text-align:center;
            ">

                <h1 style="color:white;">
                    PillNow
                </h1>

            </div>

            <div style="padding:30px;">

                <h2>Hello ${customerName}</h2>

                <p>Your order status is updated.</p>

                <div style="
                    background:#fff4e8;
                    padding:20px;
                    border-radius:12px;
                    margin-top:20px;
                ">

                    <p>
                        <strong>Order ID:</strong>
                        ${orderId}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${status}
                    </p>

                </div>

            </div>

        </div>

    </div>
    `;
};
export default orderTemplate;
