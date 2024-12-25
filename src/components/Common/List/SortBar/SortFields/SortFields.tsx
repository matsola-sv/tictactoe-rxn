import {FC} from "react";
import classNames from "classnames";
import "./SortFields.css";

interface SortFieldsProps {
    fields: string[];    // List of sortable fields
    activeField: string; // Currently selected sorting field
}

const SortFields: FC<SortFieldsProps>  = ({fields, activeField}) => {
   return (
       <ul className="sort-fields">
           {fields.map((field) => (
               <li
                   key={field}
                   className={classNames("sort-field", {active: activeField === field})}
               >
                   <span className="field-name">
                       {field}
                   </span>
               </li>
           ))}
       </ul>
   );
};
export default SortFields;