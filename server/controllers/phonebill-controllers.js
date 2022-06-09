const parseData = (req, res) => {
  const lines = req.body.split("\r\n");
  const phoneData = [];
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].split(",");
    const duration = lines[i][0].split(":");
    const durationInSeconds =
      parseInt(duration[0]) * 3600 +
      parseInt(duration[1]) * 60 +
      parseInt(duration[2]);
    phoneData.push({
      duration: durationInSeconds,
      number: lines[i][1],
      cost: 0,
    });
  }
  const phoneDataCharged = phoneData.map((item) => {
    if (item.duration < 300) {
      item.cost = item.duration * 3;
    }
    if (item.duration >= 300) {
      const minutes = Math.ceil(item.duration / 60);
      item.cost = minutes * 150;
    }
  });

  let noDuplicatesPhoneData = [];
  for (let i = 0; i < phoneDataCharged.length; i++) {
    if (noDuplicatesPhoneData.length === 0) {
      noDuplicatesPhoneData.push(phoneDataCharged[i]);
    } else {
      for (let j = 0; j < noDuplicatesPhoneData.length; j++) {
        if (phoneDataCharged[i].number === noDuplicatesPhoneData[j].number) {
          console.log("duplicate");
        }
      }
      if (!duplicate) {
        noDuplicatesPhoneData.push(phoneDataCharged[i]);
      }
    }
  }

  res.status(200).send(phoneData);
};

exports.parseData = parseData;
