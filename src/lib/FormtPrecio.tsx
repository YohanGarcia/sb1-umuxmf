import { NumericFormat } from "react-number-format";

interface Props {
  precio: number;
}

const FormatPrecio: React.FC<Props> = ({ precio }) => {
  return (
    <NumericFormat
      value={precio}
      displayType={"text"}
      thousandSeparator={true}
      decimalScale={2}
      fixedDecimalScale={true}
      prefix={"RD$ "}
    />
  );
};

export default FormatPrecio;
