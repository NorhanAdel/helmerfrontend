import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./Contact.scss";
import "react-toastify/dist/ReactToastify.css";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", {
        name,
        email,
        subject,
        message,
      });
      toast.success("تم إرسال رسالتك بنجاح");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("حدث خطأ أثناء الإرسال");
    }
  };

  return (
    <div className="contact-us">
      <div className="contact-hero">
        <h1>تواصل معنا</h1>
        <p>نحن هنا دائمًا لمساعدتك والإجابة على كل استفساراتك</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>معلومات التواصل</h2>
          <p>
            <strong>📍 العنوان:</strong> سندبيس طريق القناطر الخيريه
          </p>
          <p>
            <strong>📞 الهاتف:</strong> 01029843501
          </p>
          <p>
            <strong>✉️ الإيميل:</strong> companyhelmer@gmail.com
          </p>
          <p>
            <strong>🕐 المواعيد:</strong> من 9 صباحًا حتى5 مساءً
          </p>

          <a
            href="https://wa.me/01029843501"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            تواصل معنا على واتساب
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>ارسل لنا رسالة</h2>
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="الموضوع"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            placeholder="اكتب رسالتك هنا..."
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">إرسال</button>
        </form>
      </div>

      <div className="contact-map">
        <iframe
          title="موقعنا"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.826961266165!2d31.164683699999998!3d30.250618000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14586f005b14aedb%3A0xe60c8fba8291e2b4!2z2LTYsdmD2Kkg2YfZitmE2YXYsSDZhNmF2YbYqtis2KfYqiDYp9mE2KPZhNio2KfZhg!5e1!3m2!1sen!2seg!4v1752322515943!5m2!1sen!2seg"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
 
        
      </div>

      <ToastContainer />
    </div>
  );
}

export default ContactUs;
