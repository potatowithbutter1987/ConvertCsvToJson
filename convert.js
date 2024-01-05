const fs = require("fs");
const csv = require("csvtojson");

const inputCsvPath = "./data/data.csv";
const outputPath = "./out";
const lang = ["ja", "en"];
const jsonIndent = 2;

exports.csv2json = async function () {
  const jsonArray = await csv().fromFile(inputCsvPath);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // 言語ファイル処理
  for (const locale of lang) {
    const langJson = { article: {} };
    langJson.article = Object.assign(
      {},
      ...jsonArray.map((d, index) => {
        return {
          [`trans_${index}`]: {
            title: locale == "ja" ? d["タイトル日本語"] : d["タイトル英語"],
            content: locale == "ja" ? d["記事日本語"] : d["記事英語"],
            tagHistory: locale == "ja" ? d["時代タグ日本語"] : d["時代タグ英語"],
            tagArchitecture: locale == "ja" ? d["建築タグ日本語"] : d["建築タグ英語"],
          },
        };
      })
    );

    const jsonStr = JSON.stringify(langJson, undefined, jsonIndent);
    fs.writeFileSync(`${outputPath}/${locale}.json`, jsonStr);
  }

  // 描画用データ処理
  const additionalJson = jsonArray.map((d, index) => {
    return {
      [`photoName`]: d["写真"],
      transKey: `trans_${index}`,
      [`latLng`]: d["緯度経度"].replace(/\s+/g, ""),
      [`tagPeriod`]: d["時代タグ日本語"],
      [`tagArchitecture`]: d["建築タグ日本語"],
    };
  });

  const jsonStr = JSON.stringify(additionalJson, undefined, jsonIndent);
  fs.writeFileSync(`${outputPath}/data.json`, jsonStr);
};
