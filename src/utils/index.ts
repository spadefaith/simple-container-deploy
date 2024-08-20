import Joi from "joi";
import Models from "../../db/models";
export const parseEntity = (entity, opts?) => {
  const attrs = entity["tableAttributes"];
  const obj: any = {};
  let hasFilter = false;

  Object.keys(attrs).forEach((key) => {
    const { type, field, allowNull, primaryKey, defaultValue } = attrs[key];

    if (opts) {
      if (opts.filter) {
        const hasPk = opts.filter.includes("pk");

        if ((hasPk && primaryKey) || opts.filter.includes(field)) {
          hasFilter = true;
        } else {
          return;
        }
      }
    }

    const fieldType = type.constructor.name;
    let l = null;
    if (fieldType == "STRING") {
      const { length } = type.options;
      l = length;
    }

    let o: any = {};
    o.length = l;
    o.fieldType = primaryKey ? "NUMBER" : fieldType;
    o.allowNull = primaryKey ? true : allowNull;
    o.field = field;
    o.primaryKey = primaryKey;
    o.defaultValue = defaultValue;

    obj[field] = o;
  });
  return obj;
};

type OptsType = {
  filter?: any[];
  extend?: any;
};

export const generateSchema = (obj) => {
  const o = {};
  let pk = "";

  Object.keys(obj).forEach((key) => {
    const row = obj[key];
    const { length, fieldType, allowNull, field, primaryKey, defaultValue } =
      row;

    if (primaryKey) {
      pk = field;
    }

    if (fieldType == "STRING") {
      o[field] = Joi.string();
      if (length) {
        o[field] = o[field].max(length);
      }
    } else if (fieldType == "INTEGER") {
      // o[field] = Joi.string().external(async (value) => {
      //     if(allowNull && value == undefined){
      //         return;
      //     }
      //     if(isNaN(Number(value))){
      //         throw new Error(`${field} value is not valid`);
      //     };
      // })
      o[field] = Joi.number();
    } else if (fieldType == "DOUBLE") {
      // o[field] = Joi.string().external(async (value) => {
      //     if(allowNull && value == undefined){
      //         return;
      //     }

      //     if(isNaN(Number(value))){
      //         throw new Error(`${field} value is not valid`);
      //     };
      //     if(!String(value).includes('.')){
      //         throw new Error(`${field} value is not valid`);
      //     }
      // })
      o[field] = Joi.number();
    } else if (fieldType == "NUMBER") {
      o[field] = Joi.number();
    }

    if (o[field]) {
      if (allowNull) {
        o[field] = o[field].optional();
      } else if (defaultValue) {
        o[field] = o[field].default(defaultValue);
      } else {
        o[field] = o[field].required();
      }
    }
  });

  return (opts?: OptsType) => {
    let ro = {};
    let { filter, extend } = opts || {};

    if (filter) {
      const hasAll = filter.filter((item) => item == "*");
      if (hasAll.length > 1) {
        throw new Error("multiple '*' is not allowed");
      } else if (hasAll.length && filter[0] != "*") {
        throw new Error("filter '*' should be the first element");
      }

      if (hasAll.length) {
        Object.keys(o).forEach((key) => {
          filter.unshift(key);
        });
      }

      filter = filter.map((item) => {
        if (item.constructor.name == "Array") {
          const [key, alias] = item;
          if (["pk", "id"].includes(key)) {
            return [pk, alias];
          }
          return item;
        } else {
          if (["pk", "-pk"].includes(item)) {
            return item == "pk" ? pk : item == "-pk" ? `-${pk}` : item;
          } else if (["id", "-id"].includes(item)) {
            return item == "id" ? pk : item == "-id" ? `-${pk}` : item;
          } else {
            return item;
          }
        }
      });

      const removeItem = filter
        .filter((item) => {
          if (item.constructor.name == "Array") {
            return false;
          } else {
            return item.substring(0, 1) == "-";
          }
        })
        .map((item) => {
          return item.slice(1);
        });

      if (removeItem.length) {
        filter = filter
          .filter((item) => {
            if (item.constructor.name == "Array") {
              return true;
            } else {
              return item.substring(0, 1) != "-";
            }
          })
          .filter((item) => {
            if (item.constructor.name == "Array") {
              return true;
            } else {
              return !removeItem.includes(item);
            }
          });
      }

      filter.forEach((item) => {
        if (item.constructor.name == "Array") {
          const [key, alias] = item;
          if (o[key]) {
            ro[alias] = o[key];
          }
        } else {
          if (o[item]) {
            ro[item] = o[item];
          }
        }
      });
    } else {
      ro = o;
    }

    return {
      pk,
      generatedSchema: Joi.object(ro),
    };
  };
};

export const extractAndDelete = (obj, props, def?) => {
  const r = obj[props];
  delete obj[props];

  return def ? r || def : r;
};

export const restructEnv = async (app) => {
  const findEvs = await Models.EnvModel.findAll({
    raw: true,
    where: {
      app_id: app.app_id,
    },
  });

  if (!findEvs.length) {
    return null;
  }

  const restruct = await findEvs.reduce((accu, iter) => {
    accu[iter.prop_key] = iter.prop_value;
    return accu;
  }, {});

  return restruct;
};
