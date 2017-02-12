var allDomains = [];
var allKingdoms = [];

$(document).ready(function(){

    // modal
    $(".btn").on('click', function(){
        $("#myModal").modal('show');
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

    $('#newEntry').on('submit', function(e) {
      e.preventDefault();
      var radioValue = $("input[name='type']:checked").val();
      if(radioValue==='domain'){
        $.ajax({
          method: 'POST',
          url: '/api/domains',
          data: $(this).serialize(),
          success: newDomainSuccess,
        });
      } else {
        $.ajax({
          method: 'POST',
          url: '/api/kingdoms',
          data: $(this).serialize(),
          success: newKingdomSuccess,
        });
      }
    });

    $.ajax({
      method: 'GET',
      url: `/api/domains`,
      success: function(json){
        allDomains = json;
      }
    });

    $.ajax({
      method: 'GET',
      url: `/api/kingdoms`,
      success: function(json){
        allKingdoms = json;
      }
    });

});


function render(){
  $('table').empty();
  var selector = $('.selector').val();
  if (selector==='Domains'){
    $('table').append("<tr><th class='text-center'>Name</th><th class='text-center'>Characteristics</th><th class='text-center'>Image</th></tr>")
    var html = getDomainsHtml();
    $('table').append(html);
  } else {
    $('table').append('<tr><th class="text-center">Name</th><th class="text-center">Characteristics</th><th class="text-center">Image</th><th class="text-center">In Domain</th></tr>')
    var html = getKingdomsHtml();
    $('table').append(html);
  }
};

function getKingdomsHtml(){
  return allKingdoms.map(getKingdomHtml).join("");
}

function getKingdomHtml(kingdom){
  return `<tr>
          <td>${kingdom.name}</td>
          <td>${kingdom.characteristics}</td>
          <td><img src="${kingdom.image}"></td>
          <td>${kingdom.domain.name}</td>
          </tr>`
}

function getDomainsHtml(){
  return allDomains.map(getDomainHtml).join("");
}

function getDomainHtml(domain){
  return `<tr>
          <td>${domain.name}</td>
          <td>${domain.characteristics}</td>
          <td><img src="${domain.image}"></td>
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
