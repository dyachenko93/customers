const db = require('../requests');

const router = app => {
  app.get('/', async (request, response) => {
    try {
      const sql = "SELECT * FROM users";
      const res = await db.query(sql)
      response.send({
        users: res.rows
      });
    } catch (err) {
      console.log(err.stack)
    }
  });

  app.get('/clients', async (request, response) => {
    try {
      const sql = `SELECT c.id, c.name, (SELECT STRING_AGG(cp.number, ';') FROM client_phone cp WHERE cp.client_id = c.id) as phones, COUNT(e.id) as events
                  FROM clients c 
                  LEFT JOIN events e ON c.id = e.client_id
                  GROUP BY c.id`
      const res = await db.query(sql)
      const clients = res.rows.map(i => {
        i.phones = i.phones ? i.phones.split(';') : [];
        return i
      })
      response.send({status: 200, clients: clients});
    } catch (err) {
      console.log(err.stack)
      response.send({status: 400, error: err});
    }
  });

  app.get('/client/:id', async (request, response) => {
    try {
      var id = request.params.id;
      const sql = `SELECT e.start_date, e.device, e.client_info, e.service_info, e.end_date
                  FROM clients c 
                  LEFT JOIN events e ON c.id = e.client_id
                  WHERE c.id = ${id}`;
      const res = await db.query(sql)
      response.send({status: 200, clients: res.rows});
    } catch (err) {
      console.log(err.stack)
      response.send({status: 400, error: err});
    }
  });

  app.post('/client/new', async (request, response) => {
    try {
      const data = request.body;
      if(data.name) {
        const newCustomerSQL = `INSERT INTO clients (name) VALUES ('${data.name}') RETURNING id;`;
        const res = await db.query(newCustomerSQL);
        if(res.rows[0] && res.rows[0].id && data.phones.length) {
          let newPhonesSQL = `INSERT INTO client_phone (client_id, number) VALUES`;
          data.phones.forEach((i, idx) => newPhonesSQL += `${idx>0?',':''} (${res.rows[0].id}, '${i}')`)
          const phones = await db.query(newPhonesSQL);
        }
        response.send({status: 200, client: res.rows[0].id});
      }
    } catch(err) {
      console.log(err.stack)
      response.send({status: 400, error: err});
    }
  });

  app.post('/client/remove', async (request, response) => {
    try {
      const data = request.body;
      if(data.id) {
        const sql = `DELETE FROM clients WHERE id = ${data.id}`;
        const res = await db.query(sql);
        response.send({status: 200, result: 'success'});
      }
    } catch(err) {
      console.log(err.stack)
      response.send({status: 400, error: err});
    }
  });

  app.get('/event/:id', async (request, response) => {
    try {
      var id = request.params.id;
      const sql = `SELECT e.start_date, e.device, e.client_info, e.service_info, e.end_date
                  FROM events e
                  WHERE e.id = ${id}`;
      const res = await db.query(sql)
      response.send({status: 200, clients: res.rows});
    } catch (err) {
      console.log(err.stack)
      response.send({status: 400, error: err});
    }
  });

  app.post('/event/new', async (request, response) => {
    try {
      const data = request.body;
      if(data.client) {
        const start = data.start ? `'${data.start}'` : null;
        const end = data.end ? `'${data.end}'` : null;
        const newEventSQL = `INSERT INTO events (start_date, device, client_info, service_info, end_date, client_id) 
                             VALUES (${start}, '${data.device||''}', '${data.clientInfo||''}', '${data.serviceInfo||''}', ${end}, ${data.client}) RETURNING id;`;
        const res = await db.query(newEventSQL);
        response.send({status: 200, event: res.rows});
      }
    } catch(err) {
      console.log(err.stack)
      response.send({status: 400, error: err});
    }
  });

  app.post('/event/edit', async (request, response) => {
    try {
      const data = request.body;
      if(data.id) {
        const start = data.start ? `'${data.start}'` : null;
        const end = data.end ? `'${data.end}'` : null;
        const newEventSQL = `UPDATE events 
                             SET start_date = ${start}, device = '${data.device||''}', end_date = ${end}, 
                             client_info = '${data.clientInfo||''}', service_info = '${data.serviceInfo||''}' 
                             WHERE id = ${data.id}`;
        const res = await db.query(newEventSQL);
        response.send({status: 200, event: res.rows});
      }
    } catch(err) {
      console.log(err.stack)
      response.send({status: 400, error: err});
    }
  });

  app.post('/event/remove', async (request, response) => {
    try {
      const data = request.body;
      if(data.id) {
        const sql = `DELETE FROM events WHERE id = ${data.id}`;
        const res = await db.query(sql);
        response.send({status: 200, result: 'success'});
      }
    } catch(err) {
      console.log(err.stack)
      response.send({status: 400, error: err});
    }
  });
}

// Export the router
module.exports = router;
