var allDomains = [];
var allKingdoms = [];

$(document).ready(function(){

    // modal
    $(".btn").on('click', function(){
        $("#newItem").modal('show');
    });

    $(".submit").on('click', function(){
        $("#newItem").modal('hide');
    });

    //creates modals for editing
    $("table").on('click', '.edit', function(event){
      $('#editDomain').remove();
      $('#editKingdom').remove();
      var id = $(event.target).attr('data-id');
      var selector = $('.selector').val();
      if(selector==='Domains'){
          var name;
          var characteristics;
          var image;
          for(var index = 0; index < allDomains.length; index++) {
            if(allDomains[index]._id === id) {
              name = allDomains[index].name;
              characteristics = allDomains[index].characteristics;
              image = allDomains[index].image;
            }
          }
          $('.modal-div').append(
            `<div class="modal fade" id="editDomain" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Edit This Domain:</h4>
                  </div>
                  <div class="modal-body">
                    <form class="form" id="editEntry">
                      <div class="form-group">
                        <br>
                        <input type="text" class="form-control" name="name" value="${name}">
                        <input type="text" class="form-control" name="characteristics" value="${characteristics}">
                        <input type="text" class="form-control" name="image" value='${image}'>
                      </div>
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      <input type="submit" class="submit btn btn-primary">
                    </form>
                  </div>
                </div>
              </div>
            </div>`
          );
          $("#editDomain").modal('show');
          $("#editEntry").on('submit', function(e){
            e.preventDefault();
            $.ajax({
              method: 'PUT',
              url: '/api/domains/'+id,
              data: $(this).serialize(),
              success: function(){
                $.ajax({
                  method: 'GET',
                  url: `/api/domains`,
                  success: function(json){
                    allDomains = json;
                    render();
                  },
                  error: handleError
                });
              },
              error: handleError
            });
              $("#editDomain").modal('hide');
          });
      }
      else {
        var name;
        var characteristics;
        var image;
        var domain;
        for(var index = 0; index < allKingdoms.length; index++) {
          if(allKingdoms[index]._id === id) {
            name = allKingdoms[index].name;
            characteristics = allKingdoms[index].characteristics;
            image = allKingdoms[index].image;
            domain = allKingdoms[index].domain;
          }
        }
        $('.modal-div').append(
          `<div class="modal fade" id="editKingdom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Edit This Kingdom:</h4>
                </div>
                <div class="modal-body">
                  <form class="form" id="editEntry">
                    <div class="form-group">
                      <br>
                      <input type="text" class="form-control" name="name" value="${name}">
                      <input type="text" class="form-control" name="characteristics" value="${characteristics}">
                      <input type="text" class="form-control" name="domain" placeholder="${domain.name}">
                      <input type="text" class="form-control" name="image" value='${image}'>
                    </div>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <input type="submit" class="submit btn btn-primary">
                  </form>
                </div>
              </div>
            </div>
          </div>`
        );
        $("#editKingdom").modal('show');
        $("#editEntry").on('submit', function(e){
          e.preventDefault();
          $.ajax({
            method: 'PUT',
            url: '/api/kingdoms/'+id,
            data: $(this).serialize(),
            success: function(){
              $.ajax({
                method: 'GET',
                url: `/api/kingdoms`,
                success: function(json){
                  allKingdoms = json;
                  render();
                },
                error: handleError
              });
            },
            error: handleError
          });
          $("#editKingdom").modal('hide');
      });
    };
  });

    // disabled boxes in modal
    $(".domainkingdom").click(function(){
      var radioValue = $("input[name='type']:checked").val();
      if(radioValue==='domain'){
        $("#domain").prop('disabled', true);
      } else {
        $("#domain").prop('disabled', false);
      }
    });

    $('.selector').on('change', function(){
      render();
    });

    //submitting new entries
    $('#newEntry').on('submit', function(e) {
      e.preventDefault();
      var radioValue = $("input[name='type']:checked").val();
      if(radioValue==='domain'){
        $.ajax({
          method: 'POST',
          url: '/api/domains',
          data: $(this).serialize(),
          success: newDomainSuccess,
          error: handleError
        });
      } else {
        $.ajax({
          method: 'POST',
          url: '/api/kingdoms',
          data: $(this).serialize(),
          success: newKingdomSuccess,
          error: handleError
        });
      }
    });

    //getting all entries
    $.ajax({
      method: 'GET',
      url: `/api/domains`,
      success: function(json){
        allDomains = json;
        render();
      },
      error: handleError
    });

    //getting all entries
    $.ajax({
      method: 'GET',
      url: `/api/kingdoms`,
      success: function(json){
        allKingdoms = json;
      },
      error: handleError
    });

    $('select').on('change', function(){
      var selector = $('.selector').val();
      if(selector==='Domains'){
        $.ajax({
          method: 'GET',
          url: `/api/domains`,
          success: function(json){
            allDomains = json;
            render();
          },
          error: handleError
        });
      } else {
        $.ajax({
          method: 'GET',
          url: `/api/kingdoms`,
          success: function(json){
            allKingdoms = json;
            render();
          },
          error: handleError
        });
      }
    })

    $('table').on('click', '.delete', function(e) {
      e.preventDefault();
      var id = $(this).attr('data-id');
      var selector = $('.selector').val();
      if(selector==='Domains'){
        $.ajax({
          method: 'DELETE',
          url: `/api/domains/${id}`,
          success: deleteDomainSuccess,
          error: handleError
        });
      } else {
        $.ajax({
          method: 'DELETE',
          url: `/api/kingdoms/${id}`,
          success: deleteKingdomSuccess,
          error: handleError
        });
      }
    });

});

function render(){
  $('table').empty();
  var selector = $('.selector').val();
  if (selector==='Domains'){
    $('table').append("<tr><th class='text-center'>Name</th><th class='text-center'>Characteristics</th><th class='text-center'>Image</th><th class='text-center'>Edit</th></tr>")
    var html = getDomainsHtml();
    $('table').append(html);
  } else {
    $('table').append('<tr><th class="text-center">Name</th><th class="text-center">Characteristics</th><th class="text-center">Image</th><th class="text-center">In Domain</th><th class="text-center">Edit</th></tr>')
    var html = getKingdomsHtml();
    $('table').append(html);
  }
};

function getKingdomsHtml(){
  return allKingdoms.map(getKingdomHtml).join("");
}

function getKingdomHtml(kingdom){
  return `<tr data-id="${kingdom._id}">
          <td>${kingdom.name}</td>
          <td>${kingdom.characteristics}</td>
          <td><img src="${kingdom.image}"></td>
          <td>${kingdom.domain.name}</td>
          <td><button type="button" data-id="${kingdom._id}" data-target="#editKingdom" class="edit btn btn-default btn-block btn-info">Edit</button><button type="button" data-id="${kingdom._id}" class="delete btn btn-default btn-block btn-danger" data-dismiss="modal">Delete</button></td>
          </tr>`
}

function getDomainsHtml(){
  return allDomains.map(getDomainHtml).join("");
}

function getDomainHtml(domain){
  return `<tr data-id="${domain._id}">
          <td>${domain.name}</td>
          <td>${domain.characteristics}</td>
          <td><img src="${domain.image}"></td>
          <td><button type="button" data-id="${domain._id}" data-target="#editDomain" class="edit btn btn-default btn-block btn-info">Edit</button><button type="button" data-id="${domain._id}" class="delete btn btn-default btn-block btn-danger" data-dismiss="modal">Delete</button></td>
          </tr>`
}

function newDomainSuccess(domain){
  allDomains.push(domain);
  render();
}

function newKingdomSuccess(kingdom){
  allKingdoms.push(kingdom);
  render();
}

function deleteDomainSuccess(domain){
  var domainId = domain._id;
  for(var index = 0; index < allDomains.length; index++) {
    if(allDomains[index]._id === domainId) {
      allDomains.splice(index, 1);
      break;
    }
  }
  render();
};

function deleteKingdomSuccess(kingdom){
  var kingdomId = kingdom._id;
  for(var index = 0; index < allKingdoms.length; index++) {
    if(allKingdoms[index]._id === kingdomId) {
      allKingdoms.splice(index, 1);
      break;
    }
  }
  render();
}

function handleError(err){
  console.log("There was an error")
}
