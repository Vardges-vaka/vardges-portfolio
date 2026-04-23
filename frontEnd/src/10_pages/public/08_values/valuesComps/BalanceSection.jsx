import React from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const BalanceSection = ({ balance }) => {
  const { t } = useTranslation("tempContent");

  if (!balance) return null;

  return (
    <motion.section
      className="balanceSection"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}>
      <div className="balanceSection__header">
        <Scale size={32} />
        <h2>{balance.title}</h2>
      </div>

      <div className="balanceSection__statements">
        {balance.statements.map((statement, idx) => (
          <p key={idx} className="balanceSection__statement">
            {statement}
          </p>
        ))}
      </div>

      <div className="balanceSection__baseline">
        <strong>{t("ui.values.inSimpleTerms")}</strong>
        <ul>
          {balance.baseline.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="balanceSection__conclusion">{balance.conclusion}</p>
    </motion.section>
  );
};

BalanceSection.propTypes = {
  balance: PropTypes.object.isRequired,
};

export default BalanceSection;

